const exp= require('express')
const app= exp();
const bp= require('body-parser')

const cors=require('cors')
  
  app.use(cors());

const registory=require('./api/routers/register')
const profile= require('./api/routers/profile')

const session= require('express-session')
app.use(session({secret:"shaaa"}))

const mongoose= require('mongoose')
mongoose.connect("mongodb://localhost:27017/SocialNetwork",{useNewUrlParser:true}).then(()=>{
    console.log("Mongo Connected")
}).catch(err=>{
    console.log("Mongo Error")
})
app.use(bp.urlencoded({extended:false}))
app.use(bp.json())

app.use("/register",registory)
app.use('/profile', profile)
app.use("/tmp", exp.static('tmp'))

app.use((req,res,next)=>{
    const error= new Error("Not Found")
    error.status=404;
    next(error)
})


app.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        error:error.message
    })
})

module.exports= app;