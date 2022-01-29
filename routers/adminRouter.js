const router = require('express').Router();
const jwt=require('jsonwebtoken')
const helpers = require('../helpers/admin-helpers');



router.post('/login',(req,res)=>{
    console.log(req.body);
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({errorMessage:"All fields are required"})
        }
        if(email ==="admin@new" && password ==="123456"){
            
            const adminToken = jwt.sign({admin:true},process.env.JWT_ADMIN_KEY)
            console.log(adminToken);
            res.json({adminToken})

            
            return res.status(200)
        }else{
            return res.status(401).json({errorMessage:"Wrong email or password"}) 
        }

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }

})
//fetch users
router.get('/fetchdata',(req,res)=>{
 helpers.getUsers().then((resp)=>{
     console.log('reached here');
     console.log('nere nokkkkk');
      console.log(resp)
      res.json({resp})
 })
 
})
//add users
router.post('/adduser',(req,res)=>{
    
    helpers.addUser(req.body).then((resp)=>{
        res.json({resp})
    })
})

//update users

router.post('/update',(req,res)=>{
    helpers.updateuser(req.body).then((resp)=>{
        res.json({resp})
})

})

//search user
router.get('/search/:search',async(req,res)=>{
    const search =req.params.search
   const data=await helpers.searchUser(search).then((users)=>{
       res.json({users})
   })

})

//delete user
router.get('/delete/:id',(req,res)=>{
  helpers.deleteUser(req.params.id).then((resp)=>{
      res.json({resp})
  })
})
//getUserById

router.get('/getuser/:id',(req,res)=>{

    helpers.getSpecificUser(req.params.id).then((resp)=>{

        console.log("deleted ---------");
        res.json({resp})
    })
})


module.exports=router

