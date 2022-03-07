import express from  "express";
import config from  "../config/default";
import connect from "./db/connect"
import auth from "./routes/auth"
import user from "./routes/user"
import 'dotenv/config'
import path from "path";


const port: any = config.port
const host: any = config.host

const app = express()
app.set('views', path.join(__dirname, './views'))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//establish server and connect ot the database
app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)
    connect()

    // authorization routes
    auth(app)

    // user routes
    user(app)
})