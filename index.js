const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotennv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit:"10mb"}))

  const PORT = process.env.PORT || 8000;

//MONGODB CON
  console.log(process.env.MONGODB_URL)
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>console.log("Connect to Database"))
  .catch((err)=> console.log(err))
//API
//schema
  const userSchema = mongoose.Schema({
                    firstName: String, 
                    lastName : String,
                    email : {
                    type: String,
                    unique: true,
                    },
                    password: String,
                    confirmPassword: String,
                    image: String,
});
  const userModel = mongoose.model("user", userSchema)
                    app.get("/",(req, res)=>{
                    res.send("Sever is running")
})

//Sign up
      app.post("/signup", async (req, res) => {
      console.log(req.body)
  const { email } = req.body;
      userModel.findOne({email : email}, (err, result)=>{
      console.log(result)
      console.log(err)
    if (result){
      res.send({message: "A username is already taken. Try a different name.", alert: false})
        }
    else{
  const data = userModel(req.body)
  const save = data.save()
      res.send({message: "Successful Registration",alert: true})
}
})  
})

//API Login
    app.post("/login",(req, res)=>{
    console.log(req.body)
    const {email} = req.body
    userModel.findOne({email: email},(err, result)=>{
  if(result){
    const dataSend = {
      _id: result._id,
      image: result.image,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
    };
    console.log(dataSend)
    res.send({message: "Login Successful", alert: true, data: dataSend });
      }
      else{
    res.send({message:"Please try again or Sign up", alert: false,})
      }
    })
  })
  
  app.listen(PORT, () => console.log("Server is running at PORT: " + PORT));