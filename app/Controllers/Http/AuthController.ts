import Prisma from '@ioc:Adonis/Addons/Database/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomUUID } from 'crypto'

export default class AuthController {
  public async signup({ request, response, auth }: HttpContextContract) {
    const data = request.only(['email', 'password'])
    data.password = await Hash.make(data.password)
    data['rememberMeToken'] = await Hash.make(randomUUID())

    const createdAccount = await Prisma.account.create({ data })
    await auth.use('web').login(createdAccount)

    return response.created()
  }

  public async signin({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const account = await auth.attempt(email, password)
    account.password = undefined

    return response.json(account)
  }
}
