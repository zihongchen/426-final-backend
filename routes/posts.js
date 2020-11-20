const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')


//GET BACK ALL THE POSTS 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)    
    }catch(err){
        res.json({message: err})
    }
})


router.post('/',async (req,res)=>{
    console.log(req.body)
    const post = await new Post({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        description : req.body.description
    })
    try{
        const savedPost = await post.save()
        res.json(savedPost)

    }catch(err){
        res.json({message:err})
    }
    
    
})



// SPECIFIC POST 
router.get('/:postId',async (req, res)=>{
    try{
    //console.log(req.params.postId)
    const post = await Post.findById(req.params.postId)
    res.json(post)
    }catch(err){
        res.json({message:err})
    }

})

// DELETE A SPECIFIC POST  
router.delete('/:postId', async(req,res)=>{
    try{
        const removedPost = await Post.remove({_id : req.params.postId})
        res.json(removedPost)
    }catch(err){
        res.json({message:err})
    }
    
})

//UPDATE A POST 
router.patch('/:postId', async(req,res)=>{
    try{
        const updatedPost = await Post.updateOne({_id : req.params.postId},
        {$set:{
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            description : req.body.description
            }   
        }
        )
        res.json(updatedPost)
    }catch(err){
        res.json({message:err})
    }
    
})





module.exports = router
