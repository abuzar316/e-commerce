const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const url = `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`

module.exports =  async()=>{
    try {
        await mongoose.connect(url)
        console.log("Database connect successfully");
    } catch (error) {
        console.log(`Database Connection error ${error}`);
    }
}

