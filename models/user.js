const mongoose = require('mongoose'), Schema = mongoose.Schema  

const userSchema = new Schema({
    sUsername: {
        type: String,
        require: [true, 'Username is required']
    },
    sEmail: {
        type: String,
        unique: true,
        require: [true, 'Email is required']
    },
    nMobile: {
        type: String,
        unique: true,
        required: [true, 'Number is required']
    },
    sPassword: {
        type: String,
        require: [true, 'Password is require']
    },
    eRole: {
        type: String,
        enum: {
            values: ['USER', 'SELLER'],
            message: '{VALUE} is not supported'
        },
        require: [true, 'Role is require']
    },
    sToken: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('users', userSchema)

module.exports = User