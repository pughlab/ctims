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
   populateGeneTable();
}).catch(e => {
  console.error(e)
}).finally(async () => {
  await prisma.$disconnect()
})

async function fetchHgncData() {
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
    data.response.docs.forEach(async (x) => {
      await prisma.gene.create({
        data: {
          hugoSymbol: x.symbol,
        },
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function populateGeneTable() {
  try {
    const data = await fetchHgncData();
    await saveGenes(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}