const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const verifyUser = require('./verifyToken.js')


//GET 

router.get('/', verifyUser, async (req, res) => {
    try {
        const posts = await Users.find({},
            {
            "email":1,
            "first_name":1,
            "last_name":1,
            "is_alumni":1,
            "description":1,
            "time_slot":1,
            "_id":0
        })
        // const userInfo = req.user
        // const specificUser = await Users.find({
        //     "_id" : userInfo._id
        // })
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

// Get all comfirmed meetings (all information for time slot)








module.exports = router