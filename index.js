const express = require('express');
const path = require('path');
const Web3 = require('web3');

const app = express();


//adding bodypaser to ger data in the output
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const logger = (req,res,next) =>{
    console.log(`${req.protocol} : //${req.get('host')}${req.orginalUrl}`);
    next();
}


//Init middleware
app.use(logger);


//Members api routes
app.use('/api/generateKeys', require('./routes/api/members'));







const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

