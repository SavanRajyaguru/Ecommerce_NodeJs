const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const Product = require('../models/product')


class ProductController{
    async addProduct(req, res){
        try {
            req.body.iSellerId = req.decoded.id
            
            const result = await Product.create(req.body)

            if(!result){
                return messaging(res, statuscode.statusSuccess, false, 'Product not created')
            }
            console.log(result)
            return messaging(res, statuscode.statusSuccess, true, 'Product uploaded successfully')
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }

    async listProduct(req, res){
        try {
            const { category, limit } = req.params
            if(!category){
                const allList = await Product.find({},{__v: 0})
                return messaging(res, statuscode.statusSuccess, true, 'All Product', allList)
            }
            const result = await Product.find({sCategory: category},{__v: 0}).limit(limit)

            if(!result || result.length <= 0){
                return messaging(res, statuscode.statusSuccess, false, 'Products does not exists', result)
            }
            return messaging(res, statuscode.statusSuccess, true, 'Products List', result)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }
}

module.exports = new ProductController()