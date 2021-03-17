const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})
const app = require('./app')
const path = require("path")

const db= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

const PORT =process.env.PORT || 8000
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>console.log('database connected successfully'))



if(process.env.NODE_ENV==="production")
{
    app.use(express.static("frontend/build"))

    app.get('*',(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}

app.listen(PORT,()=>
{
    console.log(`App running on ${PORT}`)
})