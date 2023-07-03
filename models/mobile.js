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
        require: [true, 'Ram and Rom is require']
    },
    sProcessor: {
        type: String,
        require: [true, 'Processor is require']
    },
    sRearCamera: {
        type: String,
        require: [true, 'Rear Camera is require']
    },
    sFrontCamera: {
        type: String,
        require: [true, 'Front Camera is require']
    },
    sDisplay: {
        type: String,
        require: [true, 'Display is require']
    },
    sBattery: {
        type: String,
        require: [true, 'Battery is require']
    },
    sNetworkType: {
        type: String,
        require: [true, 'NetworkType is require']
    },
    sSimType: {
        type: String,
        require: [true, 'Password is require']
    },
    eAudioJack: {
        type: String,
        enum: ['Yes', 'No'],
        require: [true, 'Audio Jack is require']
    }
})

const Mobile = mongoose.model('mobiles', mobileSchema)

module.exports = Mobile