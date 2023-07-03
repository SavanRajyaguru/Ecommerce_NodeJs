const userController = require('../controller/user.controller')
const validator = require('../middleware/validate_user')

const router = require('express').Router()

router
    .post('/sign-up', validator.validateUserSignup, userController.signUpUser)
    .post('/login', userController.loginUser)
    .get('/', (req, res) => {
        return res.status(200).json({message: 'Success test2'})
    })

module.exports = router