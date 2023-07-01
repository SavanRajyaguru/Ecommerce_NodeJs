require('dotenv').config()

// SET NODE_ENV=development
// for the env 
// const env = process.env.NODE_ENV; // 'dev' or 'test'

const config = {
    app: {
        port: process.env.PORT || 4040,
        secret_key: process.env.TOKEN_SECRET || 'crash',
        // expireIn: '1h',
        DB_URL: process.env.MONGODB_URL || '',
    }
}

module.exports = config