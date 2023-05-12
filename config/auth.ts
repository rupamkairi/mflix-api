import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'web',
  guards: {
    web: {
      driver: 'session',
      provider: {
        driver: 'prisma',
        identifierKey: 'id',
        uids: ['email'],
        usersTable: 'account',
      },
    },
    basic: {
      driver: 'basic',
      realm: 'Login',
      provider: {
        driver: 'prisma',
        identifierKey: 'id',
        uids: ['email'],
        usersTable: 'account',
      },
    },
  },
}

export default authConfig
