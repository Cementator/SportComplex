import 'dotenv/config'

export default {
    port: 3000,
    host: "localhost",
    dbUrl: `${process.env.DATABASE_URL}`
};