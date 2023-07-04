const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const dbConnect = require('./database/db_connect')
const userRoute = require('./routes/user.routes')
const config = require('./config/config')


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* Database connection
dbConnect()

//* v1 route api
app.use('/api/v1', userRoute)

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Success test'})
})
app.get('/test', (req, res) => {
    return res.status(200).json({message: 'Success test1'})
})

//* If there is an error on all routes then default all 
app.all('*', (req, res) => {
    res.status(404).send('<h1>Data Not Found</h1>')
})

app.listen(config.app.port, (err) => {
    if (err) {
        console.log('Error on listen', err)
    }
    // console.log(`Server is running on ${config.app.port}...`)
    console.log(`Server is running on ${config.app.port}`)
})