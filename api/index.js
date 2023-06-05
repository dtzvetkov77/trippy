const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
const authRoute = require("./routes/auth");


app.use(express.json());
dotenv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Connected to DB'))
.catch(err => console.log(err))
.catch(err => console.log(err));

app.use("/api/auth", authRoute);

app.listen('5000', () => console.log('Server is running on port 5000...'));