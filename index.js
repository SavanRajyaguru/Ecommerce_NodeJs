const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Success!'})
})

//* If there is an error on all routes then default all 
app.all('*', (req, res) => {
    res.status(404).send('<h1>Data Not Found</h1>')
})

app.listen(6000, (err) => {
    if (err) {
        console.log('Error on listen', err)
    }
    // console.log(`Server is running on ${config.app.port}...`)
    console.log('Server is running on 6000')
})