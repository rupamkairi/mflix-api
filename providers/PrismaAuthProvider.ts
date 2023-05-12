import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { HashContract } from '@ioc:Adonis/Core/Hash'
import type { ProviderUserContract, UserProviderContract } from '@ioc:Adonis/Addons/Auth'
import type { account } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type User = account

export type PrismaAuthProviderConfig = {
  driver: string
  identifierKey: string
  uids: string[]
  usersTable: string
}

class PrismaProviderUser implements ProviderUserContract<User> {
  constructor(public user: User | null, private hash: HashContract) {}

  public getId() {
    return this.user ? this.user.id : null
  }

  public getRememberMeToken() {
    return this.user ? this.user.rememberMeToken : null
  }

  public setRememberMeToken(token: string) {
    if (!this.user) {
      return
    }
    this.user.rememberMeToken = token
  }

  public async verifyPassword(plainPassword: string) {
    if (!this.user) {
      throw new Error('Cannot verify password for non-existing user')
    } else {
      return this.hash.verify(this.user.password, plainPassword)
    }
  }
}

export class PrismaUserProvider implements UserProviderContract<User> {
  constructor(public config: PrismaAuthProviderConfig, private hash: HashContract) {}

  public async getUserFor(user: User | null) {
    return new PrismaProviderUser(user, this.hash)
  }

  public async updateRememberMeToken(user: PrismaProviderUser) {
    await prisma.account.update({
      where: { id: user.getId()! },
      data: { rememberMeToken: user.getRememberMeToken() },
    })
  }

  public async findById(id: number | string) {
    const user = await prisma.account.findFirst({
      where: { id: id as number },
    })
    return this.getUserFor(user || null)
  }

  public async findByUid(uidValue: string) {
    const user = await prisma.account.findFirst({
      where: { email: uidValue },
    })
    return this.getUserFor(user || null)
  }

  public async findByRememberMeToken(userId: number | string, token: string) {
    const user = await prisma.account.findFirst({
      where: { id: userId as number, rememberMeToken: token },
    })

    return this.getUserFor(user || null)
  }
}

export default class PrismaAuthProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    const Auth = this.app.container.resolveBinding('Adonis/Addons/Auth')
    const Hash = this.app.container.resolveBinding('Adonis/Core/Hash')

    Auth.extend('provider', 'prisma', function (_, __, config) {
      return new PrismaUserProvider(config, Hash)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
