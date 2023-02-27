const express = require('express');
const router = express.Router();
const Web3 = require('web3');

const web3Provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/89a6fb4f0505485483da7e03877fe3aa"
);

const web3 = new Web3(web3Provider);


//Gnerating Private Key and Public Key
router.get('/', (req, res)=>{
    const account = web3.eth.accounts.create();
    console.log('My Accounts', account);
    res.status(200).send(account);
});



module.exports = router;