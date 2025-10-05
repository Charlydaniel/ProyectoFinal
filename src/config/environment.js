import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT={
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GMAIL_PASSWORD:process.env.GMAIL_PASSWORD
}
export default ENVIRONMENT