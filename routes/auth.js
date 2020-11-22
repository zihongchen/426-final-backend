const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Users = require('../models/users')
const {
    registerValidation,
    loginValidation
} = require('../validation')



//GET BACK ALL THE POSTS 
router.post('/register', async (req, res) => {

    //VALIDATION FOR NEW REGISTRATION
    const {
        error
    } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //CHECK IF USER IS ALREADY REGISTERED
    const emailExists = await Users.findOne({
        email: req.body.email
    })
    if (emailExists) return res.status(400).send("email already registered")

    //HASH PASSWORDS
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    //CREATE NEW REGISTRATION
    const user = await new Users({
        email: req.body.email,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        description: req.body.description,
        is_alumni: req.body.is_alumni,
        time_slot: []
    })

    try {
        const savedUser = await user.save()
        res.send({
            user: user._id
        })
    } catch (err) {
        res.status(400).send(err)

    }
})


router.post('/login', async (req, res) => {

    //VALIDATION FOR LOGIN
    const {
        error
    } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //CHECK LOGIN INFO
    const user = await Users.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send("Email does not exist")
    // bcrypt.compare(req.body.password, user.password, function(err, result) {
    //     if(!result) return res.status(400).send("Invalid password")
    // });
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return res.status(400).send("Invalid password")

    //CREATE AND SIGN AND JWT TOKEN
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })
    res.header('auth-token', token).send(token)

})



module.exports = router