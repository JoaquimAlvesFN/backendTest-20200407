'use strict'

const Product = use('App/Models/Product')
const {logInfo, logError} = require('./Utils/Logger')

class ProductController {
    async index({auth, request, response}) {
        try {
            const {page, perPage} = request.get()
            const listAll = await Product.query().paginate(page, perPage)
            
            logInfo(auth, request)

            return response.json(listAll)
        } catch (error) {
            logError(error)
        }
    }

    async show({auth, request, response}) {
        try {
            const {page, perPage} = request.get()
            const filter = request.only(['name', 'description', 'category'])
            
            const filterProduct = await Product.query().orWhere(filter).paginate(page, perPage)

            logInfo(auth, request)

            return response.json(filterProduct)
            
        } catch (error) {
            logError(error)
        }
        
    }

    async store({auth, request, response}) {
        try {
            const {
                name,
                description,
                category,
                price,
                stock
            } = request.body
    
            const productStored = await Product.create({
                name,
                description,
                category,
                price,
                stock
            })

            logInfo(auth, request)
    
            return response.json(productStored)
        } catch (error) {
            logError(error)
        }
    
    }

    async update({auth, params, request, response}) {
        try {
            const {name, description, category, stock, price} = request.body
            const {id} = params

            const productUpdated = await Product.query()
            .where('id', id)
            .update({ 
                name, 
                description, 
                category, 
                stock, 
                price
            })

            logInfo(auth, request)

            return response.json(productUpdated)
        } catch (error) {
            logError(error)
        }

    }

    async destroy({auth, params, request, response}) {
        try {
            const {id} = params
            const findProduct = await Product.findBy('id', id)
            
            await findProduct.delete()

            logInfo(auth, request)

            return response.json({message: `Deleted product id: ${id}`})
        } catch (error) {
            logError(error)
        }
    }
}

module.exports = ProductController
