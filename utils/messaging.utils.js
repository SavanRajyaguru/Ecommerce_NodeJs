const messaging = (res, statusCode, value, data, token) => {
    try {
        return res.status(statusCode).json({ statusCode: statusCode, message: value, token: token ?? '', data: data ?? {} })
    } catch (error) {
        console.log('ERROR in msg>>>>>> ', error)
        return res.status(200).json({ Error: error })
    }
}

module.exports = { messaging }