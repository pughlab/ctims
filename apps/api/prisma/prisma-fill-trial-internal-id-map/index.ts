import {PrismaClient} from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function fillTrialInternalIdMap() {
  // Fetch trials where internal_id is null or empty
  const trials = await prisma.trial.findMany({
    where: {
      trial_internal_id: null,
    },
  });

  const idProtocolMap = {};

  for (const trial of trials) {
    // Generate an internal_id (this example uses UUIDs)
    const internalId = uuidv4();

    // Update the trial record
    // await prisma.trial.update({
    //   where: { id: trial.id },
    //   data: { trial_internal_id: internalId },
    // });

    // Record the mapping
    const val = {
      'protocol_no': trial.protocol_no,
      'userId': trial.userId,
      'trial_groupId': trial.trial_groupId,
    };
    idProtocolMap[internalId] = val;
  }

  return idProtocolMap;
}

fillTrialInternalIdMap()
  .then(idProtocolMap => {
    console.log('Trial internal ID map:', idProtocolMap);
  })
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
