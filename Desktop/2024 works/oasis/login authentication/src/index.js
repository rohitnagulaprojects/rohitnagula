const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const collection = require("./config");
const { name } = require('ejs');

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("Signup");
});

app.post("/signup", async(req, res)=>{
    const data = {
        name: req.body.username,
        password : req.body.password
    }

    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User Already Exists. Please choose a different Username.");
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; 
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})
app.post("/login" ,async(req,res)=>{
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("Username Cannot Found !");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            req.send("wrong password");
        }
    }
    catch{
        res.send("wrong details");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at port : ${port}`);
});
