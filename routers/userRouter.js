const router = require("express").Router();
const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');










//signup api
router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const{name,email,password:psd,passwordVerify}=req.body;

     if(!name ||!email|| !psd ||!passwordVerify ){
         return res.status(400).json({errorMessage:"Please Enter all details"});
     }
     if(psd.length<6){
         return res.status(400).json({errorMessage:"Enter minimum 6 characters"});
     }
     if(psd !== passwordVerify){
         return res.status(400).json({errorMessage:"Enter the same password"});
     }

     const isUser= await User.findOne({email});
     console.log(isUser);
     if(isUser){
         return res.status(400).json({errorMessage:"This Email is already taken"})
     }

      //hash password
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(psd,salt)

    // save user to db
     const newUser =await  new User({name,email,password})

     const savedUser= await newUser.save();
     console.log(savedUser);
   

     //create a jwt token for log the user in
     const token = jwt.sign({user:savedUser._id,},process.env.JWT_SECRET_KEY);
     console.log(token);


     res.json({token,savedUser})


    //  //send that token in a HTTP only cookie
    //  res.cookie('token',token,{httpOnly:true}).send()
     


    } catch (error) {
    console.error(error);
    res.status(500).send()
    }



});



//login api



router.post('/login',async(req,res)=>{
    try {
        
const { email, password}= req.body;
  

if(!email||!password){
   return res.status(400).json({errorMessage:"Enter the details correctly"})
}

 const isUser=await User.findOne({email})

if(!isUser){
    return res.status(401).json({errorMessage:"Wrong email or password"})

}
const originalPassword=await bcrypt.compare(password,isUser.password);

if(!originalPassword){
    return res.status(401).json({errorMessage:"Wrong email or password"})
}

 //if all details correct give token with cookie to loging user

 //like session want cookie @ time of login and signup to get autheraization
 const token=jwt.sign({user:isUser._id},process.env.JWT_SECRET_KEY);

 res.json({token,isUser})

//  //sending cookie
//  res.cookie("token",token,{httpOnly:true}).send();


    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})  

//logout api

// router.get('/logout',(req,res)=>{
//     //passing empty cookie without token to clear the token 
//  res.cookie("token","",{httpOnly:true,expires:new Date(0),}).send()

// });


// //api to check the user in logged in or not
// router.get('/loggedin',(req,res)=>{
//     try {
//         const token = req.cookies.token
//         if(!token){
//             console.log('no tokennnn');
//          return res.json({res:false});
        
//         }
//         jwt.verify(token,process.env.JWT_SECRET_KEY);
//         res.send(true);

//     } catch (error) {
//         res.json(false)
//         console.log('token error');
//     }
// })


 

  module.exports = router