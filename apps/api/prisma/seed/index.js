const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'anton@gmail.com',
      name: 'anton',
    }
  })
}

main().then(() => {
  console.log('done')
}).catch(e => {
  console.error(e)
}).finally(async () => {
  await prisma.$disconnect()
})
