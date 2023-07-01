const { signUpUser, loginUser } = require('../controller/user.controller')

const router = require('express').Router()

router
    .post('/sign-up', signUpUser)
    .post('/login', loginUser)
    .get('/', (req, res) => {
        return res.status(200).json({message: 'Success test2'})
    })

module.exports = router