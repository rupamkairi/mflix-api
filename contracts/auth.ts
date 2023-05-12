import { PrismaAuthProviderConfig, PrismaUserProvider } from 'providers/PrismaAuthProvider'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      // implementation: DatabaseProviderContract<DatabaseProviderRow>
      // config: DatabaseProviderConfig
      implementation: PrismaUserProvider
      config: PrismaAuthProviderConfig
    }
  }

  interface GuardsList {
    web: {
      implementation: SessionGuardContract<'user', 'web'>
      config: SessionGuardConfig<'user'>
      client: SessionClientContract<'user'>
    }

    basic: {
      implementation: BasicAuthGuardContract<'user', 'basic'>
      config: BasicAuthGuardConfig<'user'>
      client: BasicAuthClientContract<'user'>
    }
  }
}
