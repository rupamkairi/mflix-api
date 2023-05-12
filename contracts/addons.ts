declare module '@ioc:Adonis/Addons/Database/Prisma' {
  import { PrismaClient } from '@prisma/client'
  const Prisma: PrismaClient
  export default Prisma
}
