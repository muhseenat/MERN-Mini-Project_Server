const mongoose =require ('mongoose')

module.exports={
    dbConnect:(url)=>{
        mongoose.connect(url).then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log('Database error',err);
        })
    }
}