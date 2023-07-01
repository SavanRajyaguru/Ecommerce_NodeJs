const mongoose = require('mongoose')
const config = require('../config/config')

const dbConnect = async () => {
    await mongoose.connect(config.app.DB_URL)
    .then((result) => console.log('DB connect at', result.connection.name))
    .catch((err) => console.log('DB connect error', err))
}

module.exports = dbConnect