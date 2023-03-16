const express = require('express');
const path = require('path');
const Web3 = require('web3');
const cors = require('cors');

const app = express();


//adding bodypaser to get data in the outputs
app.use(cors({
    origin:'*',
}))
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: false, limit:'50mb'}));

const logger = (req,res,next) =>{
    
    console.log(`${req.protocol} : //${req.get('host')}${req.orginalUrl}`);
    next();
}


//Init middleware
app.use(logger);


//generateKeys api router
app.use('/api/generateKeys', require('./routes/api/members'));

//owner's api routes
app.use('/api/owner', require('./routes/api/owner'))







const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

