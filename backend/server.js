const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const foodRoute = require('./routes/foodRoute')
const userRoute = require('./routes/userRoute')


//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use('/api/food',foodRoute)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRoute)//
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log(`Server started on http://localhost:${port}`))