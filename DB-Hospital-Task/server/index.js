// Core Imports
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')



const app = express();

dotenv.config();

const dbService = require("./dbService");

app.use(express.json());
app.use(cors());



app.get("/getall", async (req, res) => {

  const db = dbService.getDbServiceInstance();



  var data = await db.getAllData();

  console.log(data);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      status: "FAILURE",
      message: "data not found",
    });

  }

})




app.post("/insert/recorddata", async (req, res) => {

  

  // const {id,name}=req.body;

  var data = req.body;
  const db = dbService.getDbServiceInstance();

  let users = false;
  try {
    users = await db.insertData(data);
    
    if (users) {

      

      res.status(200).json({
        message: "insertion succssful",
        status: "SUCCESS",
  
      });
  
    } else {
  
      return res.status(404).json({
        status: "FAILURE",
        message: "user not found",
      });
  
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  

 


});
app.post("/insert/billdata", async (req, res) => {

  

  // const {id,name}=req.body;

  var data = req.body;
  const db = dbService.getDbServiceInstance();

  let users = false;
  try {
    users = await db.insertBillData(data);
    
    if (users) {

      

      res.status(200).json({
        message: "insertion succssful",
        status: "SUCCESS",
  
      });
  
    } else {
  
      return res.status(404).json({
        status: "FAILURE",
        message: "user not found",
      });
  
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  

 


});


app.patch("/login", async (req, res) => {

  const { username, pin } = req.body;

  const db = dbService.getDbServiceInstance();

  let users = [];
  try {
    users = await db.authenticateUser(username, pin);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  if (users.length === 0) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "user not found",
    });
  }
  res.status(200).json({
    message: "login succssful",
    status: "SUCCESS",
    user: users[0]
  });







})



app.listen(5000, () => {
  console.log("Running on port 5000");
});