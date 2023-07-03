const messaging = (res, statusCode, bool, value, data) => {
    try {
        return res.status(statusCode).json({ success: bool, message: value, data: data})
    } catch (error) {
        console.log('ERROR in msg>>>>>> ', error)
        return res.status(200).json({ Error: error })
    }
}

module.exports = { messaging }