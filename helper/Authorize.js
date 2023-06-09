const Comment = require('../models/CommentSchema');
const User = require('../models/UserSchema');
//const Post = require('../models/PostSchema');
const jwt=require('jsonwebtoken');
const {promisify}=require('util')
const verifyJwt=promisify(jwt.verify)

const authorizedUser = async (req,res,next)=>{

    const token =req.headers.authorization;
    if(!token)
    {
        const error=new Error('unauthorized');
        error.statusCode=401;
        return next(error)

    }
const {id}=await verifyJwt(token,"mySecret")
const user=await User.findById(id)

    const comment =  await Comment.find({_id: req.params.comment_id});
    // return error if the comment is not found
    if(!comment){
        const error = new Error("Comment Not Found");
        error.statusCode = 404;
        return next(error);
    }

    // autherize if the user is an admin or the comment creator
    if(user.role == "admin" || comment.user == id){
        return next();  
    }

    // return error if it's another user
    if(comment.user != id){
        const error = new Error("Not authorized to do this action");
        error.statusCode = 403;
        return next(error);
    }

}

module.exports = {
    authorizedUser
}
