const jwt = require('jsonwebtoken')
const config = require('../config/config')


function createJwt(data){
    const token = jwt.sign(data, config.app.secret_key)
    return token
}

module.exports = createJwt