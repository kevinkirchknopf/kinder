const express=require("express")
const sequelize=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const authenticateToken=require('./middleware/authMiddleware')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
const cors=require("cors")

dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true 
}));


app.use('/auth',authRoutes)

app.get('/protected',authenticateToken,(req,res)=>{
    res.json({message:"You have accessed a protected route",user:req.user})
})

sequelize.sync().then(()=>{
    app.listen(process.env.PORT||4000,()=>console.log(`server running on: ${process.env.PORT||4000}`))
})