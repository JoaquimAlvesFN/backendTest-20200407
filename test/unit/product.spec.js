'use strict'

const { test, trait } = use('Test/Suite')('Product endpoint testing')
const Product = use('App/Models/Product')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('add product to database using api', async ({ client, faker }) => {
  const user = await User.find(1)
  const storeProduct = await client.post('/product')
  .loginVia(user, 'jwt')
  .send({
    "name": faker.string,
    "description": faker.string,
    "category": faker.string,
    "price":10.00,
    "stock":10
  }).end()

  storeProduct.assertStatus(200)
})

test('listing all products', async ({ client }) => {
    const user = await User.find(1)
    const getProducts = await client.get('/product').loginVia(user, 'jwt').end()
    
    getProducts.assertStatus(200)
})

test('updating the name of product', async ({ client }) => {
  const user = await User.find(1)
  const updateProducts = await client.put(`/product/${1}`)
  .loginVia(user, 'jwt').send({
    'name':'testeUpdate'
  }).end()
  
  updateProducts.assertStatus(200)
})

test('deleting product by id', async ({ client }) => {
  const user = await User.find(1)
  const deleteProduct = await client.delete(`/product/${2}`).loginVia(user, 'jwt').end()
  
  deleteProduct.assertStatus(204)
})