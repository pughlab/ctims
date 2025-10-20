import { PrismaClient } from '@prisma/client';
import * as prompts from 'prompts';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

const sourcePrisma = new PrismaClient();
sourcePrisma.$use(fieldEncryptionMiddleware());

export async function main() {
  // 1. List trial_group with trials available to copy
  const trialGroups = await sourcePrisma.trial_group.findMany();
  console.log('Available trial groups:');
  trialGroups.forEach((group, index) => {
    console.log(`${index + 1}. ${group.name}`);
  });

  const response = await prompts({
    type: 'number',
    name: 'selection',
    message: 'Enter the number of the trial group to copy:',
    validate: (value) => value > 0 && value <= trialGroups.length,
  });

  if (response.selection === undefined) {
    console.log('No trial group selected. Exiting.');
    return;
  }

  const selectedTrialGroup = trialGroups[response.selection - 1];
  const trialGroupResponse = { trialGroupId: selectedTrialGroup.id };

  // 2. Get destination DB connection string and encryption key
  const dbResponse = await prompts([
    {
      type: 'text',
      name: 'databaseUrl',
      message: 'Enter the destination database connection string:',
    },
    {
      type: 'password',
      name: 'encryptionKey',
      message: 'Enter the destination database encryption key (format: k1.aesgcm256.xxx):',
    },
  ]);

  if (!dbResponse.databaseUrl || !dbResponse.encryptionKey) {
    console.log('Database URL and encryption key are required. Exiting.');
    return;
  }

  // Validate encryption key format
  if (!dbResponse.encryptionKey.startsWith('k1.aesgcm256.')) {
    console.error('Invalid encryption key format. Expected format: k1.aesgcm256.xxx');
    return;
  }

  // 3. Connect to destination DB
  const destinationPrisma = new PrismaClient({
    datasources: {
      db: {
        url: dbResponse.databaseUrl,
      },
    },
  });

  destinationPrisma.$use(
    fieldEncryptionMiddleware({
      encryptionKey: dbResponse.encryptionKey,
    })
  );

  // 4. Validate destination database
  try {
    await destinationPrisma.$connect();
    console.log('Successfully connected to the destination database.');
  } catch (error) {
    console.error('Failed to connect to the destination database:', error);
    return;
  }

  console.log('Starting data copy...');

  // 5. Get trials to copy, find all trials for the specified trial group
  const trialsToCopy = await sourcePrisma.trial.findMany({
    where: { trial_groupId: trialGroupResponse.trialGroupId },
    include: { ctml_jsons: true, ctml_schemas: true },
  });

  // 6. Map users, trial_groups, and ctml_schemas
  const userIds = new Set<number>();
  if (trialsToCopy.length > 0) {
    trialsToCopy.forEach(trial => {
      if (trial.userId) userIds.add(trial.userId);
      if (trial.modifiedById) userIds.add(trial.modifiedById);
    });
  }

  const sourceUsers = await sourcePrisma.user.findMany({
    where: { id: { in: [...userIds] } }
  });

  // check if the destination DB already has user defined, if so map to them if they have same email
  const destUsers = await destinationPrisma.user.findMany();
  const userMap = new Map<number, number>();
  for (const sourceUser of sourceUsers) {
    const destUser = destUsers.find((u) => u.email === sourceUser.email);
    if (destUser) {
      userMap.set(sourceUser.id, destUser.id);
    } else {
        console.log(`Creating user in destination DB: ${sourceUser.email}`);
        const newDestUser = await destinationPrisma.user.create({
            data: {
                email: sourceUser.email,
                name: sourceUser.name,
                username: sourceUser.username,
                first_name: sourceUser.first_name,
                email_verified: sourceUser.email_verified,
                last_name: sourceUser.last_name,
                refresh_token: sourceUser.refresh_token,
                keycloak_id: sourceUser.keycloak_id,
            }
        });
        userMap.set(sourceUser.id, newDestUser.id);
    }
  }

  // check if destination DB has trial group defined, if so map them by group name
  const sourceTrialGroups = await sourcePrisma.trial_group.findMany({
    where: { id: trialGroupResponse.trialGroupId }
  });
  const destTrialGroups = await destinationPrisma.trial_group.findMany();
  const trialGroupMap = new Map<number, number>();
  for (const sourceGroup of sourceTrialGroups) {
    const destGroup = destTrialGroups.find((g) => g.name === sourceGroup.name);
    if (destGroup) {
      trialGroupMap.set(sourceGroup.id, destGroup.id);
    } else {
        console.log(`Creating trial group in destination DB: ${sourceGroup.name}`);
        const newDestGroup = await destinationPrisma.trial_group.create({
            data: {
                name: sourceGroup.name,
            }
        });
        trialGroupMap.set(sourceGroup.id, newDestGroup.id);
    }
  }
  const selectedTrialGroupId = trialGroupMap.get(trialGroupResponse.trialGroupId);


  const sourceSchemas = await sourcePrisma.ctml_schema.findMany();
  const destSchemas = await destinationPrisma.ctml_schema.findMany();
  const schemaMap = new Map<number, number>();
  for (const sourceSchema of sourceSchemas) {
    const destSchema = destSchemas.find((s) => s.version === sourceSchema.version);
    if (destSchema) {
      schemaMap.set(sourceSchema.id, destSchema.id);
    } else {
        const newDestSchema = await destinationPrisma.ctml_schema.create({
            data: {
                version: sourceSchema.version,
                schema: sourceSchema.schema,
            }
        });
        schemaMap.set(sourceSchema.id, newDestSchema.id);
    }
  }

  // 7. Copy trials and ctml_jsons using transaction for data integrity
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const trial of trialsToCopy) {
    try {
      if (trial.trial_internal_id) {
        // skip trial if already exists in destination DB
        const existingTrial = await destinationPrisma.trial.findFirst({
          where: { trial_internal_id: trial.trial_internal_id },
        });

        if (existingTrial) {
          console.log(`Skipping trial: ${trial.nct_id} (already exists in destination)`);
          skipCount++;
          continue;
        }
      }

      console.log(`Copying trial: ${trial.nct_id}`);

      // Use transaction to ensure atomicity for each trial and its related data
      await destinationPrisma.$transaction(async (tx) => {
        const newTrial = await tx.trial.create({
          data: {
            trial_internal_id: trial.trial_internal_id,
            nct_id: trial.nct_id,
            nickname: trial.nickname,
            principal_investigator: trial.principal_investigator,
            status: trial.status,
            trial_groupId: selectedTrialGroupId,
            modifiedById: trial.modifiedById ? userMap.get(trial.modifiedById) : null,
            userId: trial.userId ? userMap.get(trial.userId) : null,
            protocol_no: trial.protocol_no,
            trial_status: trial.trial_status,
            matchSentDate: trial.matchSentDate,
            createdAt: trial.createdAt,
            updatedAt: trial.updatedAt,
            ctml_schemas: {
              connect: trial.ctml_schemas.map(schema => ({id: schemaMap.get(schema.id)}))
            },
          },
        });

        for (const ctmlJson of trial.ctml_jsons) {
          console.log(`  Copying ctml_json: ${ctmlJson.id}`);
          await tx.ctml_json.create({
            data: {
              trialId: newTrial.id,
              versionId: ctmlJson.versionId ? schemaMap.get(ctmlJson.versionId) : null,
              data: ctmlJson.data,
              has_match: ctmlJson.has_match,
              createdAt: ctmlJson.createdAt,
              updatedAt: ctmlJson.updatedAt,
            },
          });
        }
      });

      successCount++;
      console.log(`✓ Successfully copied trial: ${trial.nct_id}`);
    } catch (error) {
      errorCount++;
      console.error(`✗ Failed to copy trial: ${trial.nct_id}`, error.message);
      console.error(`  Error details:`, error);
    }
  }

  console.log('\n=== Data copy complete ===');
  console.log(`Successfully copied: ${successCount} trials`);
  console.log(`Skipped (already exist): ${skipCount} trials`);
  console.log(`Failed: ${errorCount} trials`);

  await sourcePrisma.$disconnect();
  await destinationPrisma.$disconnect();
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
