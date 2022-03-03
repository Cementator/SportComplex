import mongoose from "mongoose";
import config from "../../config/default"
require('dotenv').config();

function connect(){
    const dbUrl: any = config.dbUrl;

    return mongoose.connect(dbUrl)
        .then(() =>{console.log("Connected to database")})
        .catch((error)=>{console.log(error)
            process.exit(1)
        })
}

export default connect