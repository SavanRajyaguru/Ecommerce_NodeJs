const mongoose = require('mongoose'), Schema = mongoose.Schema  

const cartSchema = new Schema({
    iUserId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    iProductId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        require: true
    }
})

const Cart = mongoose.model('cart-and-user', cartSchema)

module.exports = Cart