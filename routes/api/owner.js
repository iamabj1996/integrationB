const { SHA256 } = require('crypto-js');
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
        const trx =  tokenContract.methods.addClients(clientAddress);
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

router.post('/storeTableData', async(req,res)=>{
    const {callerPrivateKey, appName, tableName, typeOfScript, releaseVersion, encryptedData, callerAccountAddress} = req.body
    console.log('encryptedData', encryptedData);
    const stringData = JSON.parse(encryptedData)
    const finalEncryptedData= [];
    stringData.map((data)=>{
       let newData = {sys_id: data.sys_id , script: SHA256(data.script + data.sys_id).toString()};
       finalEncryptedData.push(JSON.stringify(newData));
    })
    // compareArrays(finalEncryptedData, midServerData2);
    // console.log(finalEncryptedData);
    // if(!callerPrivateKey|| !appName || !tableName || !typeOfScript || !releaseVersion || !encryptedData || !callerAccountAddress){
    //     res.status(400).json({
    //         message:'Please include all the fields',
    //     })
    // }
    // import wallet in the provider using private key of owner
    console.log('finalEncryptedData', finalEncryptedData);
    web3Provider.eth.accounts.wallet.add(callerPrivateKey);
    try {
    
    console.log('adding tableData to blockchain');
    
    // 1 create smart contract transaction
    const trx = tokenContract.methods.storeEncryptedData(appName, tableName, typeOfScript, releaseVersion, finalEncryptedData);
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
    /** 7 send transaction, it'll be automatical/ly signed
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

// program to extract value as an array from an array of objects

function compareArrays(arr1, arr2) {

    const finalResult  = {};

    // check the length
    if(arr1.length != arr2.length) {
        finalResult.totalRecords = false;
        finalResult.totalRecordsMessage = arr2.length;
    } 
    else { 
        finalResult.totalRecords = true;
        finalResult.totalRecordsMessage = arr2.length
        
        // comparing each element of array 
        let sysIdChange = [];
        let scriptChangeAt = [];
        for(let i=0; i<arr1.length; i++) {
            
        if(Object.values(arr1[i].sys_id).toString() !==Object.values(arr2[i].sys_id).toString() ) {
                console.log('change in this sys_id', arr1[i].sys_id,arr2[i].sys_id );
                sysIdChange.push(arr1[i].sys_id);
            }
            
            
            
            if(Object.values(arr1[i].script).toString() !==Object.values(arr2[i].script).toString() ) {
                console.log('change in the script for sysId with', arr1[i].sys_id);
                scriptChangeAt.push(arr1[i].sys_id);
            }
            
          
        }
        finalResult.changeinSysIdNumber = sysIdChange;
        finalResult.scriptChangeAt = scriptChangeAt;
  }

  console.log('finalResult', finalResult);

}

module.exports = router;