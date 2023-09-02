const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
const authRoute = require("./routes/auth");
const destinationRoute = require('./routes/destination')


app.use(express.json());
dotenv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Connected to DB'))
.catch(err => console.log(err))
.catch(err => console.log(err));

app.use("/api/auth", authRoute);
app.use('/api/destinations', destinationRoute)

app.listen('5001', () => console.log('Server is running on port 5001...'));