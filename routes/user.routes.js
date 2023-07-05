const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller')
const { isAuthorizedSeller, isAuthorizedUser } = require('../middleware/checkauthorize')
const { authToken } = require('../middleware/checktoken')
const validator = require('../middleware/validation')

const router = require('express').Router()

router
    .post('/sign-up', validator.validateUserSignup, userController.signUpUser)
    .post('/login', userController.loginUser)
    .get('/get-product', authToken, isAuthorizedUser, productController.listProduct)
    .post('/add-product', authToken, isAuthorizedSeller, validator.validateProduct, productController.addProduct), 

module.exports = router