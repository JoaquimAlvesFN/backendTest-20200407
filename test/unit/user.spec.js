'use strict'

const { test, trait } = use('Test/Suite')('User endpoint testing')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('logging in with a valid user', async ({ client }) => {

  const authUser = await client.post('/authenticate').send({
    email: 'joaquim@teste.com',
    password: '123456'
  }).end()
  
  authUser.assertStatus(200)

})

test('register a new user', async ({ client, faker }) => {

  const registerUser = await client.post('/register').send({
    username: faker.username(),
    email: faker.email(),
    password: faker.password()
  }).end()
  
  registerUser.assertStatus(200)

})

test('logout user', async ({ client }) => {
  const user = await User.find(1)
  const logoutUser = await client.post('/deauthenticate').loginVia(user, 'jwt').end()
  
  logoutUser.assertStatus(200)

})