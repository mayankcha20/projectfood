const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/Donor", {useNewUrlParser: true});
const donorSchema = {
    username: String,
    email: String,
    address:String,
    contact:Number,
    password:String
  };
  
  const Donor = mongoose.model("Donor", donorSchema);

  const foodSchema={
    dname:String,
    afood:String,
    oldfood:String,
    caddress:String,
    contact: Number,
    specialn:String

  };
  const Foodd=mongoose.model("Foodd",foodSchema);

   app.get("/",function(req,res){
    res.render("home"); 
    
  });
  app.get("/register",function(req,res){
    res.render("register");

  });
  app.get("/booksdonations",function(req,res){
    res.render("booksdonations");

  });
  app.get("/cloth&shoes",function(req,res){
    res.render("cloth&shoes");

  });
  app.get("/fooddonation",function(req,res){
    res.render("fooddonation");

  });
  app.get("/home2",function(req,res){
    res.render("home2");

  });
  
  
  app.get("/donations",function(req,res){
    Foodd.find({}, function(err, foodds){
      res.render("donations", {
        posts: foodds
        });
      });
  });
  
  app.post("/fooddonation",function(req,res){
    const foodd=new Foodd({
      dname: req.body.name,
      afood: req.body.item,
      oldfood: req.body.olfdfood,
      caddress: req.body.doaddress,
      contact: req.body.phoneno,
      specialn: req.body.specialn
    });
    foodd.save();
    res.redirect("/donations");
   
  });


  app.post("/register",function(req,res){
    const donor= new Donor({
        username: req.body.username,
    email: req.body.email,
    address:req.body.address,
    contact:req.body.phoneno,
    password:req.body.password
   
  });
  donor.save();
  
  res.redirect("/");
  });
  app.get("/login",function(req,res){
    res.render("login");
  });

  app.post("/login",async(req,res)=>{
    try{
      const userl=req.body.userl;
      const passwordl =req.body.passwordl;
      const usermail=await Donor.findOne({email:userl});
     
      if(usermail.password===passwordl){
        res.redirect("/home2");
      }
      else{
        res.send("incorrect details");
      }
    }catch(error){
      res.status(400).send("invalid email");

    }
  });
 








  
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  