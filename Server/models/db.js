const express = require("express"),
      mongoose = require('mongoose');
      
require("dotenv").config();
const app =express();

mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify : false,
      useCreateIndex : true
});

const db = mongoose.connection;
try {

    db.on('error', (err)=>{
      console.log("Error connecting to DB",err)
      throw Error("Not connected to database");
    });
    
    db.once('open', ()=>{
      console.log("Connected to mongoDB")
    });
  
}
catch (error) {
   console.log("Error : ",error)
}

require("./user")