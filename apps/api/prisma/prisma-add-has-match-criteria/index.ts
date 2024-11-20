import {PrismaClient} from "@prisma/client";
import {fieldEncryptionMiddleware} from "prisma-field-encryption";

const prisma = new PrismaClient();
// Below is the important line to add as it will enable the field encryption middleware,
// so the data will be decrypted when it is fetched from the database
prisma.$use(fieldEncryptionMiddleware());

/*
 * Determine if ctml_json has at least one match criteria
 * for every row of ctml_json table, check if the data has match criteria
 * and update the has_match_criteria column
 */
async function determineHasMatchCriteria() {

  let ctmlJsons = await prisma.ctml_json.findMany();
  // let ctmlJsons: any[] = await prisma.$queryRaw`SELECT * FROM ctml_json`;
  for (const ctmlJson of ctmlJsons) {
    const hasMatch = isTrialHaveOneMatch(ctmlJson.data);
    await prisma.ctml_json.update({
      where: { id: ctmlJson.id },
      data: { has_match: hasMatch },
    });
  }
}

function isTrialHaveOneMatch(data: string) {
  const dataObj = JSON.parse(data);
  if (dataObj.treatment_list) {
    for (let step of dataObj.treatment_list.step) {
      if (step.arm) {
        for (let arm of step.arm) {
          if (arm.match && arm.match.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }
  return false;
}

determineHasMatchCriteria()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
