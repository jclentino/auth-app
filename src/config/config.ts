import 'dotenv/config'

export default {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    DB: {
        URI: process.env.MONGODB_URI || '',
    }
}