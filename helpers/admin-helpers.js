

const User = require ('../models/user_model')


module.exports={




    //function to retrive users....
    getUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            await User.find({}).then((result)=>{
                console.log(result);
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
            
           

        }
        )},


// function to add user
  addUser:(data)=>{
    return new Promise(async(resolve,reject)=>{
   const newuser=  new User({
        name:data.name,
        email:data.email,
        password:data.password
    })
     try {
        const user = await newuser.save();
        console.log(user,"----------------------------------------------");
         resolve(user)
     } catch (error) {
         reject(err)
     }
    
    })

  },


  //helper to update user
  updateuser:(data)=>{
      return new Promise((resolve,reject)=>{
          User.updateOne({_id:data.id},{$set:{
                 name:data.name,
                 email:data.email
          }}).then((resp)=>{
              resolve(resp)
          })

      })

 
  },

  //search a user
  searchUser:(search)=>{
      return new Promise((resolve,reject)=>{
            
          let keyword = search=="nofilter"?{}:{name:{$regex:search,$options:"i"}}
          console.log(keyword+"++++++++++++++++++++++++++");
          User.find(keyword).then((resp)=>{
              console.log(resp);
              resolve(resp)
          })
      })
  },


  //delete user
  deleteUser:(id)=>{
      return new Promise((resolve,reject)=>{
          console.log(id);
           User.deleteOne({_id:id}).then(()=>{
               resolve(true)
           })

      })
  },

  //get details of a specific user
  getSpecificUser:(id)=>{
      return new Promise((resolve,reject)=>{
          User.findOne({_id:id}).then((resp)=>{
              resolve(resp)
          })
      })
  }




}