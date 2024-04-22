import {PrismaClient} from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/*
 * Generate a trial_internal_id for existing trials without internal id
 * And return a collection of internal_id and trial related info for mapping in matchminer db
 */
async function fillTrialInternalId() {
  // Fetch trials where internal_id is null or empty
  const trials = await prisma.trial.findMany({
    where: {
      trial_internal_id: null,
    },
  });

  const idProtocolObj = [];

  for (const trial of trials) {
    // Generate an internal_id (this example uses UUIDs)
    const internalId = uuidv4();

    // Update the trial record
    await prisma.trial.update({
      where: { id: trial.id },
      data: { trial_internal_id: internalId },
    });

    // Record the mapping
    const val = {
      'internal_id': internalId,
      'protocol_no': trial.protocol_no,
      'userId': trial.userId,
      'trial_groupId': trial.trial_groupId,
    };
    idProtocolObj.push(val);
  }

  return idProtocolObj;
}

fillTrialInternalId()
  .then(idProtocolMap => {
    console.log('Trial internal ID map:', idProtocolMap);
  })
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
