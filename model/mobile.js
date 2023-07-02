const mongoose = require('mongoose'), Schema = mongoose.Schema  

const mobileSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Mobile name is required']
    },
    sBrandName: {
        type: String,
        require: [true, 'Brand name is required']
    },
    nPrice: {
        type: Schema.Types.Double,
        required: [true, 'Price is required']
    },
    sRamRom: {
        type: String,
        require: [true, 'Password is require']
    },
    sProcessor: {
        type: String,
        require: [true, 'Password is require']
    },
    sRearCamera: {
        type: String,
        require: [true, 'Password is require']
    },
    sFrontCamera: {
        type: String,
        require: [true, 'Password is require']
    },
    sDisplay: {
        type: String,
        require: [true, 'Password is require']
    },
    sBattery: {
        type: String,
        require: [true, 'Password is require']
    },
    sNetworkType: {
        type: String,
        require: [true, 'Password is require']
    },
    sSimType: {
        type: String,
        require: [true, 'Password is require']
    },
    eAudioJack: {
        
    }
})

const Mobile = mongoose.model('mobiles', mobileSchema)

module.exports = Mobile
// {
//     '8GB': 25000,
//     ''
// }