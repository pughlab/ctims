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
  console.log('done')
}).catch(e => {
  console.error(e)
}).finally(async () => {
  await prisma.$disconnect()
})
