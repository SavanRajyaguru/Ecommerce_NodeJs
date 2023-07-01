const { signUpUser, loginUser } = require('../controller/user.controller')

const router = require('express').Router()

router
    .post('/sign-up', signUpUser)
    .post('/login', loginUser)

module.exports = router