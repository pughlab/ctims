import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

export async function migrate(client: PrismaClient) {

  const ctmlJsons = await prisma.ctml_json.findMany();

  for (const ctmlJson of ctmlJsons) {

    let dataUpdated = false;

    const updatedData = updateTrialStatusValues(ctmlJson.data, (updated) => {
      if (updated) {
        dataUpdated = true;
      }
    });

    if (dataUpdated) {
      await prisma.ctml_json.update({
        where: { id: ctmlJson.id },
        data: { data: updatedData },
      });
      console.log(`Updated record ID: ${ctmlJson.id}`);
    }
  }
}


function updateTrialStatusValues(data: string, callback: (updated: boolean) => void): string {

    const dataObj = JSON.parse(data);
    console.log("trial_id", dataObj.trial_id)
    let updated = false;
  
    const statuses = ['her2_status', 'pr_status', 'er_status'];
  
    function updateClinicalObjects(objects: any[]) {
      for (const obj of objects) {
        if (obj.clinical ) {
            statuses.forEach((status) => {
                if (obj.clinical[status] && (obj.clinical[status] === 'True' || obj.clinical[status] === 'False')) {
                  console.log(`Updating ${status} from ${obj.clinical[status]}`);
                  obj.clinical[status] = obj.clinical[status] === 'True' ? 'Positive' : 'Negative';
                  updated = true;
                }
              });

        } else if (obj.and) {
          updateClinicalObjects(obj.and);
        } else if (obj.or) {
          updateClinicalObjects(obj.or);
        }
      }
    }
  
    if (dataObj.treatment_list) {
      for (const step of dataObj.treatment_list.step) {
        if (step.arm) {
          for (const arm of step.arm) {
            if (arm.match && arm.match.length > 0) {
                console.log("Arm Internal Id",arm.arm_internal_id)
              updateClinicalObjects(arm.match);
            }
          }
        }
      }
    }
  
    callback(updated);
    return JSON.stringify(dataObj);
  }
  

const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());
migrate(prisma).then(() => console.log('Migration completed'));
