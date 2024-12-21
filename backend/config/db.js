const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log("DB connected")
    })
}

module.exports = connectDb 