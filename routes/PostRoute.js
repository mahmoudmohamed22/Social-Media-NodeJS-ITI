const express = require("express");
const router = express.Router();
const Post = require('../models/PostSchema');

//get all posts 
router.get('/',async (req,res,next)=>{
    posts=await Post.find({});
    res.send(posts);
})


//get one post
router.get('/:id',async (req,res,next)=>{
    oldpost=await Post.findById(req.params.id);
    res.send(oldpost);
})

//create post 
router.post('/',async (req,res,next)=>{
    const post = await Post.create({
		post:req.body.post
		// user: req.user._id
	})
    await post.save();
	res.send(post)
})
///exit bug don't update in database put and patch
// router.put('/:id',async (req,res,next)=>{
//     const updatepost=req.body.post;
//     await Post.findByIdAndUpdate(req.params.id, updatepost);
//     res.send("post is updated")
// })
// //edit  post 
// router.patch('/:id',async (req,res,next)=>{
//     const updatepost=req.body.post;
//     await Post.findByIdAndUpdate(req.params.id, updatepost ,{new: true});
//     res.send("post is updated")

// })

//delete this post
router.delete('/:id',async (req,res,next)=>{
    await Post.findByIdAndDelete(req.params.id,{new: true});
    res.send("post is deleted");

})

//delete all posts 
router.delete('/',async (req,res,next)=>{

    await Post.deleteMany({});
    res.send("All posts are deleted")
})



module.exports = router;