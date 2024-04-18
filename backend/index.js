require("dotenv").config();
const express = require('express');
const cors = require("cors")
const {GoogleGenerativeAI} = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-pro"})
app.use(cors(),express.json());



app.post("/",async(req,res)=>{
  try{
    const{dish}=req.body;
    const prompt = `check grammer for this sentence ${dish}`
    const result =await model.generateContent(prompt);
    const response  = await result.response;
    const text = response.text();
    console.log(text);
    res.send({
      msg:"Here is the data ",
      text
    })
  }
  catch(err){
    console.log(err);
    res.status(500).send({
      msg:"error occured",
      err
    })
  }
})


app.listen(3000,()=>{
  console.log("server running");
})