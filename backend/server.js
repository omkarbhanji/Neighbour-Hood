require('dotenv').config();
const app = require('./app');

const mongoose = require("mongoose");
const DB = process.env.MONGODB_URL

// const DB = ${MONGODB_URL}
    

  //  "mongodb+srv://bhanjiomkar:Sucasa2021@cluster0.2q2oe.mongodb.net/?appName=Cluster0"

  

    mongoose.connect(DB).then((con) => {
        console.log("DB connection successful !");
      });
      
      app.listen(5000, () => {
        console.log(`Linstening on Port : localhost:5000`);
      });