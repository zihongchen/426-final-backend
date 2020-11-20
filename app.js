const express = require('express')// gets up the package
const app = express()
const mongoose = require('mongoose') // username: VincentDB, password: Vincent2020
const bodyParser = require('body-parser')
require('dotenv/config')



//middlewares function that execute when a route is hit 


app.use(bodyParser.json())


app.use("/createAccount", () => {
    console.log("middlewares running ")
})



//Import Routes
const postsRoute = require(`./routes/posts`)
const userRoute = require(`./routes/users.js`)

app.use('/posts', postsRoute)
app.use('/users', userRoute)







//Routes
app.get('/', (req, res) => {
    res.send("this is home")
})


app.get('/createAccount', (req, res) => {
    res.send("page to create account")
})



//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true}, 
    () => {console.log("connected to mongodb")}
)


//How to start listening 

app.listen(3001)
