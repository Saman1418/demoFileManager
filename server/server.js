const express = require('express')
var cors = require("cors");


const app = express();

app.use(cors())



app.use('/api/notification',require('./routes/api/notification'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log("server started"));