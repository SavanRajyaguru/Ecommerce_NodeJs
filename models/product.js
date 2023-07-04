const mongoose = require('mongoose'), Schema = mongoose.Schema  

const productSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Name name is required']
    },
    iSellerId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: [true, 'Seller Id is required']
    },
    sCategory: {
        type: String,
        require: [true, 'Category is required']
    },
    sBrandName: {
        type: String,
        require: [true, 'Brand name is required']
    },
    dPrice: {
        type: Number,
        required: [true, 'Price is required']
    },
    sDescription: {
        type: String,
        require: [true, 'Description is require']
    },
    sImage: {
        type: String,
        require: [true, 'Image is require'],
        default: 'https://ibb.co/3mPpbBb'
    }
})

const Product = mongoose.model('products', productSchema)

module.exports = Product