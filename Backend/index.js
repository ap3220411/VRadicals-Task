
//Import Package

const express = require("express");
const mongoose = require("mongoose")
const cors =require("cors")


const authRoutes = require('./routes/authRoutes');
const hrRoutes = require('./routes/AdminHrRoutes');




const app = express();
app.use(cors());
app.use(express.json());


// database

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Error database connection", err.message)
    })



//routes



app.use('/auth', authRoutes);

app.use( hrRoutes);

//start app

const port = 5000
app.listen(port, () => { console.log(`Server Running In Port:${port}`) });