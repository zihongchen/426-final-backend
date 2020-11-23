const PORT = process.env.PORT || 5000
const express = require('express') // gets up the package
const app = express()
const mongoose = require('mongoose') // username: VincentDB, password: Vincent2020
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')
app.use(cors())
app.use(bodyParser.json())




//Import Routes
const postsRoute = require(`./routes/posts`)
const meetingRoute = require(`./routes/meetings.js`)
const registerRoute = require(`./routes/auth.js`)
const alumniRoute = require(`./routes/alumni.js`)


//MIDDLEWARE FUNCITONS
app.use('/auth',registerRoute)


app.use('/posts', postsRoute)
app.use('/meetings', meetingRoute)
app.use('/alumni', alumniRoute)






//Routes
app.get('/', (req, res) => {
    res.send("this is home")
})




//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true
    },
    () => {
        console.log("connected to mongodb")
    }
)


//How to start listening 

app.listen(PORT)