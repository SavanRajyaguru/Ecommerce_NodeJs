const Product = require('../models/product')
const User = require('../models/user')
const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')

class SellerController{
    async getSellerProduct(req, res){
        try {
            const { id } = req.decoded
            const isSellerExist = await User.findOne({_id: id})
            if(!isSellerExist){
                return messaging(res, statuscode.statusSuccess, false, 'Seller does not exist')
            }
            const listProduct = await Product.find({iSellerId: id}, {__v: 0})
            if(listProduct.length == 0){
                return messaging(res, statuscode.statusSuccess, true, 'Add some products', [])
            }
            return messaging(res, statuscode.statusSuccess, true, 'Product List', listProduct)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }
}

module.exports = new SellerController()