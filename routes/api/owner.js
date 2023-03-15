const { SHA256 } = require('crypto-js');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { address, abi } = require('../../smartContract/Table');
const web3Provider = new Web3(new Web3.providers.HttpProvider("http://192.168.29.71:8545"));

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
          gasPrice : 0,
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
        console.log('trx',JSON.stringify(Object.values(trx)[1]));
        const stringArray = JSON.stringify(Object.values(trx)[1]);
        console.log(JSON.parse(stringArray));
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
    // console.log('body', req.body);
    // console.log('encryptedData', encryptedData);
    // const parseData = JSON.S(encryptedData);
    const finalEncryptedData= [];
    encryptedData.map((data)=>{
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
      gas ,
      gasPrice : 0,
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
console.log('this ran');
    let totalRecords ;
    let totalRecordsMessage;
    let sysIdChanges;
    let scriptChangeAts;

    console.log('arr', arr1.length, arr2.length);

    // check the length
    if(arr1.length != arr2.length) {
        totalRecords = false;
        totalRecordsMessage = arr2.length;
    } 
    else { 
        console.log('this ran2');
       totalRecords = true;
       totalRecordsMessage = arr2.length

       console.log(totalRecords);
        
        // comparing each element of array 
        let sysIdChange = [];
        let scriptChangeAt = [];
        for(let i=0; i<arr1.length; i++) {
            console.log('this ran 3', JSON.parse(arr1[i]).sys_id);
            console.log('objects', arr1[i].sys_id );
        if(JSON.parse(arr1[i]).sys_id !== JSON.parse(arr2[i]).sys_id ) {
                console.log('change in this sys_id', arr1[i].sys_id,arr2[i].sys_id );
                sysIdChange.push(JSON.parse(arr1[i]).sys_id);
            }    
            sysIdChanges = sysIdChange;   
           
            if(JSON.parse(arr1[i]).script !== JSON.parse(arr2[i]).script ) {
                console.log('change in the script for sysId with', arr1[i].sys_id);
                scriptChangeAt.push(JSON.parse(arr1[i]).sys_id);
            }
            scriptChangeAts = scriptChangeAt;
            
          
        }
        
  }
 return {
    totalRecords,
    totalRecordsMessage,
    sysIdChanges,
    scriptChangeAts,
 }       
}


//the heart function of the blockchain
router.post('/compare', async(req,res)=>{
    const { appName, typeOfScript, releaseVersion, encryptedData, callerAccountAddress} = req.body;

    try {
        // console.log('req.body', appName);
        const finalEncryptedData= [];
        // console.log(req.body);
        encryptedData.map((data)=>{
        let newData = {sys_id: data.sys_id , script: SHA256(data.script + data.sys_id).toString()};
         finalEncryptedData.push(JSON.stringify(newData));
     })
    //  console.log('finalEncyptedData')
     const trx =  await tokenContract.methods.getEncryptedData(appName,typeOfScript,releaseVersion ).call({from : callerAccountAddress});
        // console.log('trx',Object.values(trx)[1]);
        const stringArray = JSON.stringify(Object.values(trx)[1]);
        // console.log(JSON.parse(stringArray));
    const toBeComparedData = JSON.parse(stringArray)
    console.log('finalEncryptedData', finalEncryptedData);
    console.log('tobeComparedData', toBeComparedData);
    const comparedResult =   compareArrays(finalEncryptedData, toBeComparedData);
    console.log('compared');
   
    res.status(200).json(({
        data: comparedResult,
    }))
    // console.log(finalEncryptedData);
    // if(!callerPrivateKey|| !appName || !tableName || !typeOfScript || !releaseVersion || !encryptedData || !callerAccountAddress){
    //     res.status(400).json({
    //         message:'Please include all the fields',
    //     })
    // }
    // import wallet in the provider using private key of owner
    } catch (error) {
        res.status(400).json({
            message: error,
        })
    }
})

module.exports = router;