const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const verifyUser = require('./verifyToken.js')


//GET BACK ALL THE POSTS 
router.get('/', verifyUser, async (req, res) => {
    try {
        const posts = await Users.find()
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }
})





// SPECIFIC POST 
router.get('/:postId', async (req, res) => {
    try {
        //console.log(req.params.postId)
        const post = await Users.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({
            message: err
        })
    }

})

// DELETE A SPECIFIC POST  
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Users.remove({
            _id: req.params.postId
        })
        res.json(removedPost)
    } catch (err) {
        res.json({
            message: err
        })
    }

})

//UPDATE A POST 
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Users.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                description: req.body.description
            }
        })
        res.json(updatedPost)
    } catch (err) {
        res.json({
            message: err
        })
    }

})





module.exports = router