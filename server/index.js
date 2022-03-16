import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from 'cors'
// comment for heroku deployment
// import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express()
// comment for heroku deployment
// dotenv.config()


app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',postRoutes)
app.use('/user',userRoutes)

app.get('/',(req,res)=>{
    res.send('App is running')
})

const PORT= process.env.PORT || 5000
// const DB_URL=process.env.DB_URL

// change for heroku deployment
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URL=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.m1pot.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(DB_URL,{ useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`🚀  Server running on port: ${PORT} ...`)))
    .catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify',false)