const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const Product = require('../models/product')
const Cart = require('../models/cart_user')


class ProductController{
    async addProduct(req, res){
        try {
            req.body.iSellerId = req.decoded.id
            
            const result = await Product.create(req.body)

            if(!result){
                return messaging(res, statuscode.statusSuccess, false, 'Product not created')
            }
            return messaging(res, statuscode.statusSuccess, true, 'Product uploaded successfully', {})
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }

    async listProduct(req, res){
        try {
            const { category, limit } = req.query
            if(!category){
                // const allList = await Product.aggregate([
                //     {
                //         $group: {
                //             _id: '$sCategory',
                //             data: {
                //                 $topN: {
                //                     output: '$$ROOT',
                //                     sortBy: { dPrice: -1 },
                //                     n: 4,
                //                 },
                //             },
                //         }
                //     },
                //     {
                //         $group: {
                //             _id: null,
                //             data: {
                //                 $push: {
                //                     k: '$_id',
                //                     v: '$data'
                //                 }
                //             }
                //         }
                //     },
                //     {
                //         $replaceRoot: {
                //             newRoot: {
                //                 $arrayToObject: '$data'
                //             }
                //         }
                //     }
                // ])

                const categoryList = await Product.aggregate([
                    {
                        $group: {
                            _id: '$sCategory'
                        }
                    }
                ])
                const resData = []
                for (const val of categoryList) {
                    const obj = {
                        category_name: val._id
                    }
                    const data = await Product.find({ sCategory: val }, { __v: 0 }).limit(4)
                    obj['category_data'] = data
                    resData.push(obj)
                }
                // const resData = {
                //     category_name: categoryList
                // }
                // console.log(categoryList)
                return messaging(res, statuscode.statusSuccess, true, 'All Product', resData)
            }
            const result = await Product.find({sCategory: category}, {__v: 0}).limit(limit)
            // console.log(result.length)
            if(!result || result.length <= 0){
                return messaging(res, statuscode.statusSuccess, false, 'Products does not exists', result)
            }
            return messaging(res, statuscode.statusSuccess, true, 'Products List', result)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }

    async addToCart(req, res){
        try {
            if(!req.query?.productId){
                return messaging(res, statuscode.statusSuccess, true, 'Product id require')
            }
            const isInsert = await Cart.create({iUserId: req.decoded.id, iProductId: req.query.productId})

            if(!isInsert){
                return messaging(res, statuscode.statusSuccess, false, 'Product not add to the cart')
            }
            return messaging(res, statuscode.statusSuccess, true, 'Product add to cart', {})
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }

    async getCartData(req, res){
        try {
            const cartData = await Cart.find(
                {iUserId: req.decoded.id}, 
                {_id: 0, __v: 0}).populate({ path: 'iProductId', select: {__v: 0} }).lean()
            
            const dTotalPrice = cartData.reduce(
                (acc, current) => acc + current.iProductId.dPrice, 0 )

            const productData = {
                count: cartData.length,
                totalPrice: dTotalPrice,
                productList: cartData
            }
            return messaging(res, statuscode.statusSuccess, true, 'Cart product found', productData)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }

    async searchData(req, res) { 
        try {
            const { search } = req.query
            if (!search) {
                return messaging(res, statuscode.badRequest, false, 'Search parameter is required')
            }
            const data = await Product.find(
                { sName: { $regex: new RegExp(search, 'i') } },
                { sName: 1, _id: 0 }
            ).lean()
            return messaging(res, statuscode.statusSuccess, true, 'Done', data)
        } catch(error) { 
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }
}

module.exports = new ProductController()