const fs = require('fs');
const csvParser = require("csv-parser");
const { PrismaClient } = require('@prisma/client');
const readline = require('readline');
const prisma = new PrismaClient({
    datasources: {
        db: {
          url: `${process.env.DATABASE_URL}?connection_limit=100&pool_timeout=90`,
        },
      }
    }
  )
async function saveAgentClass(data){
    try{
        await prisma.agentclass.deleteMany();
        await prisma.agentclass.createMany({
            data: data,
            skipDuplicates: true,
          });
    }
    catch(error){
      console.error("Error", error)
      throw error;
    }
    finally {
        await prisma.$disconnect();
      }
}

async function askForConfirmation() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) => {
      rl.question(
        "This operation will delete all current data from the 'agent class' table. Do you want to continue? (y/n): ",
        (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y');
        }
      );
    });
  }

async function main(){
    return  new Promise((resolve, reject)=>{
        try{
            const result = [];
            fs.createReadStream("apps/api/prisma/metadata/nciagent/NCIAgentClassNames.csv")
                .pipe(csvParser())
                .on("data", (data) => {
                    result.push(data);
                })
                .on("end", () => {
                    const newResult=result.map((data)=>{
                        var id = Number(data.id);
                        var agentclass = data.agentclass.replace(/\(.*?\)/g, '');
                        return {id, agentclass}
                    });
                    resolve(newResult);
                })
                .on("error", (err) => {
                    reject(err); // Reject the Promise on error
                });
        }
        catch(err){
            console.log("Unable to fetch data because of following error:",err)
            reject(err);
        }
    });
}

(async () => {
    try {
      const confirmed = await askForConfirmation();
      if (!confirmed) {
        console.log("Operation canceled by the user.");
        await prisma.$disconnect();
        process.exit(0);
      }
  
      const result = await main();
      await saveAgentClass(result);
    } catch (error) {
      console.error("Error:", error);
    }
  })();