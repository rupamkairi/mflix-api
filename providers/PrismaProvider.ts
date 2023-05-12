import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { PrismaClient } from '@prisma/client'

export default class PrismaProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Adonis/Addons/Database/Prisma', () => {
      const Prisma = new PrismaClient()
      return Prisma
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
