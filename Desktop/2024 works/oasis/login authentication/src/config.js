const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

connect.then(()=> {
    console.log("DataBase Connected Succesfully");
})
.catch(()=> {
    console.log("DataBase cannot be connected");
});

const Loginschema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
});


const collection = new mongoose.model("users", Loginschema);

module.exports = collection;