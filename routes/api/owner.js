const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { address, abi } = require('../../smartContract/Table');
const web3Provider = new Web3("https://goerli.infura.io/v3/89a6fb4f0505485483da7e03877fe3aa");

const tokenContract = new web3Provider.eth.Contract(
    abi,
    address
    );

router.post('/add_client', async(req,res) =>{

    const {callerPrivateKey , clientAddress , callerAccountAddress} = req.body;
    console.log(req.body);
    // import wallet in the provider using private key of owner
    web3Provider.eth.accounts.wallet.add(callerPrivateKey);
   
    try {
        console.log('adding client')
    
        // 1 create smart contract transaction
        const trx = tokenContract.methods.addClients(clientAddress);
        // 2 calculate gas fee
        const gas = await trx.estimateGas({ from: callerAccountAddress });
        console.log('gas :>> ', gas);
        // 3 calculate gas price
        const gasPrice = await web3Provider.eth.getGasPrice();
        console.log('gasPrice :>> ', gasPrice);
        // 4 encode transaction data
        const data = trx.encodeABI();
        console.log('data :>> ', data);
        // 5 get transaction number for wallet
        const nonce = await web3Provider.eth.getTransactionCount(callerAccountAddress);
        console.log('nonce :>> ', nonce);
        // 6 build transaction object with all the data
        const trxData = {
          // trx is sent from the wallet
          from: callerAccountAddress,
          // trx destination is the ERC20 token contract
          to: address,
          /** data contains the amount an recepient address params for transfer contract method */
          data,
          gas,
          gasPrice,
          nonce,
        };
    
        console.log('Transaction ready to be sent');
        /** 7 send transaction, it'll be automatically signed
        because the provider has already the wallet **/
        const receipt = await web3Provider.eth.sendTransaction(trxData);
        console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
        console.log('receipt', receipt);
    
        res.json(({
            data: receipt
        }))
      } catch (error) {
        console.error('Error in transferTokens >', error);
        res.status(400).json({
            message: error
        })
    }
})

router.get('/getEncyrptedData/:appName/:scriptType/:callerAccountAddress/:releaseVersion', async (req,res) =>{
    const {appName, scriptType, callerAccountAddress, releaseVersion} = req.params;
    console.log(req.params);
    try {
        const trx =  await tokenContract.methods.getEncryptedData(appName,scriptType,releaseVersion ).call({from : callerAccountAddress});
        console.log('trx',trx);
        res.status(400).json(({
            data : trx
        }))
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
})

module.exports = router;