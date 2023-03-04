const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { address, abi } = require('../../smartContract/Table');

const web3Provider = new Web3("https://goerli.infura.io/v3/89a6fb4f0505485483da7e03877fe3aa");

// import wallet in the provider
web3Provider.eth.accounts.wallet.add('0x9b58b626d59392edee456a6e719ff97853fbe1eaaaf60abe1804c6aaec796856');

const tokenContract = new web3Provider.eth.Contract(
  abi,
  address
);


//Gnerating Private Key and Public Key
router.get('/', (req, res)=>{
    const account = web3Provider.eth.accounts.create();
    console.log('My Accounts', account);
    const {address, privateKey} = account;
    res.status(200).json({
        address,
        privateKey,
    });
});

router.get('/getManager', async (req,res)=>{
try {
    console.log(`Calling manager function`);

    //calling manager function inside smart contract
    const trx = await tokenContract.methods.owner.call().call();
    console.log('trx', trx);

    return true;
} catch (error) {
    
}
})





module.exports = router;