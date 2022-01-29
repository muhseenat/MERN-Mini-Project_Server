const jwt = require ('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config()



function auth(req,res,next){

    try {
    const token = req.cookies.token


        if(!token){
         return require.status(401).json({errorMessage:"Unauthorized"})
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET_KEY);
  
         req.user=verified.user   
      next();
    } catch (error) {
        console.log(error);
        res.status(401).json({errorMessage:"Unauthorized"}) 
    }

 }