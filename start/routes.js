'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'UserController.register').middleware(['guest'])
Route.post('/authenticate', 'UserController.authenticate').middleware(['guest'])

Route.group(() => {
    Route.get('/product', 'ProductController.index')
    Route.get('/productFilter', 'ProductController.show')
    Route.post('/product', 'ProductController.store')
    Route.put('/product/:id', 'ProductController.update')
    Route.delete('/product/:id', 'ProductController.destroy')

    Route.post('/deauthenticate', 'UserController.deAuthenticate')
}).middleware(['auth:jwt'])

