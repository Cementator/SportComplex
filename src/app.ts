// @ts-ignore
import express from  "express";
import config from  "../config/default";
import connect from "./db/connect"
import auth from "./routes/auth"
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const port: any = config.port
const host: any = config.host

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)
    connect()
    auth(app)
})