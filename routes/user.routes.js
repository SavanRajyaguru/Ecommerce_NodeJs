const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller')
const { isAuthorizedSeller } = require('../middleware/checkauthorize')
const { authToken } = require('../middleware/checktoken')
const validator = require('../middleware/validation')

const router = require('express').Router()

router
    .post('/sign-up', validator.validateUserSignup, userController.signUpUser)
    .post('/login', userController.loginUser)
    //* check with params start with here
    .post('/add-product?id', authToken, isAuthorizedSeller, validator.validateProduct, productController.addProduct), 

module.exports = router