const { PrismaClient } = require('@prisma/client')
const fs = require('fs');


const prisma = new PrismaClient()

async function main() {
  try {
    const ctml_json = fs.readFileSync('database/ctml_schema.json', 'utf8');

    const ctmlSchema = await prisma.ctml_schema.create({
      data: {
        version: 1,
        schema: ctml_json,
      },
    });

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().then(() => {
  console.log('done');
  console.log('running fetchAPISAVE');
   fetchAPISaveGenes();
}).catch(e => {
  console.error(e)
}).finally(async () => {
  await prisma.$disconnect()
})

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

async function fetchAPI() {
  try {
    const response = await fetch(
      'https://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/json/hgnc_complete_set.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function saveGenes(data) {
  try {
    const symbols = data.response.docs.map((x) => x.symbol);
    for (const symbol of symbols) {
      await prisma.gene.create({
        data: {
          hugoSymbol: symbol,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function fetchAPISaveGenes() {
  try {
    const data = await fetchAPI();
    await saveGenes(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}