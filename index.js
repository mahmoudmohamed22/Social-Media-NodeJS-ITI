const express= require('express')
const app=express()
app.use(express.json());
require('express-async-errors');
require('./db')
const CommentRoute = require("./routes/CommentRoute");
const UserRoutes=require('./routes/UserRoute')
const PostRoutes=require('./routes/PostRoute')


app.use('/user',UserRoutes)
app.use('/posts/', CommentRoute);
app.use('/posts', PostRoutes);



// 4 parameters error handler
app.use((err,req,res,next)=>{
	err.statusCode = err.statusCode || 500;
	console.log('from error handler');
	res.status(err.statusCode).json({
		status: 'error',
		message:err.message || 'something went wrong',
		err
	})
});





app.get('/posts/:id', (req, res)=>{
    console.log("hello")
})
app.listen(8000,()=>{
    console.log("listening to port 8000")
})