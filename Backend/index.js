
//Import Package

const express = require("express");
const mongoose = require("mongoose")
const cors =require("cors")
const dotenv = require("dotenv")


const authRoutes = require('./routes/authRoutes');
const hrRoutes = require('./routes/AdminHrRoutes');




const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()


// database

mongoose.connect(process.env.DATA_BASE)
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