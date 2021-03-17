const express = require("express")
const cors = require("cors")
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")

const session = require("express-session")

const Discussion = require("./models/discussionModel")
const User = require("./models/userModel")


const app = express()

app.use(cors())
app.use(express.json())

app.use(session({
    secret:"secretcode",
    resave:true,
    saveUninitialized:true
}))
app.use(cookieParser('secretcode'))

app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig")(passport)





app.get("/api/discussions", async (req,res)=>{

    try{
        const discussions = await Discussion.find()
        const totalDiscussions = discussions.length
        res.status(200).json(discussions)
        
    }
    catch(err)
    {
        res.status(404).json(
            {
                status:"failed",
                message:"Invalid Input"
            }
        )
    }
})

app.post("/api/discussions",async (req,res)=>{

    try{
        await Discussion.create(req.body)

        res.status(200).json(
            {
                status:'success'
            }
        )
    }
    catch(err)
    {
        res.status(404).json(
            {
                status:"failed",
                message:"Invalid Input"
            }
        )
    }
})


app.get("/api/discussion/:id",async(req,res)=>{
    try{
        const discussion= await Discussion.findById(req.params.id)

        res.status(200).json(discussion)
    }
    catch(err)
    {
        res.status(404).json(
            {
                status:"failed",
                message:"Invalid Input"
            }
        )
    }
})

app.post("/api/discussion/:id", async(req,res)=>{
    try{
        const id=req.params.id
        await Discussion.findByIdAndUpdate(id,{$push:{replies:req.body}}).exec()
        res.send("success")
    }
    catch(err)
    {
        res.status(404).json(
            {
                status:"failed",
                message:"Invalid Input"
            }
        )
    }
})



app.post("/api/register",(req,res)=>{
    User.findOne({username:req.body.username},async(err,doc)=>
    {
        if(err) throw err
        if(doc) res.send("User already exists")
        if(!doc)
        {
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const newUser = new User({
                username:req.body.username,
                password:hashedPassword
            })
            await newUser.save()
            res.send('new user created')
        }
    })
})





app.post("/api/login",(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(404).json({
          message:"No user exists"
      });
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(req.user);
        });
      }
    })(req, res, next);
  })



module.exports = app

