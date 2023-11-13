const { SHA256 } = require('crypto-js');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const http = require('http');
const { address, abi } = require('../../smartContract/Table');
//
const web3Provider = new Web3(
	new Web3.providers.HttpProvider('http://3.89.70.250:8080')
);

const tokenContract = new web3Provider.eth.Contract(abi, address);

router.post('/add_client', async (req, res) => {
	const { callerPrivateKey, clientAddress, callerAccountAddress } = req.body;
	console.log('body', req.body);
	// import wallet in the provider using private key of owner
	web3Provider.eth.accounts.wallet.add(callerPrivateKey);

	try {
		console.log('adding client');

		//   create smart contract transaction
		const trx = await tokenContract.methods.addClients(clientAddress);
		console.log('this ran again');
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
		const nonce = await web3Provider.eth.getTransactionCount(
			callerAccountAddress
		);
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
			gasPrice: 0,
			nonce,
		};

		console.log('Transaction ready to be sent', trxData);
		/** 7 send transaction, it'll be automatically signed
        because the provider has already the wallet **/
		const receipt = await web3Provider.eth.sendTransaction(trxData);
		console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
		console.log('receipt', receipt);

		res.json({
			data: receipt,
		});
	} catch (error) {
		console.error('Error in transferTokens >', error);
		res.status(400).json({
			message: error,
		});
	}
});

router.get(
	'/getEncyrptedData/:appName/:scriptType/:callerAccountAddress/:releaseVersion',
	async (req, res) => {
		const { appName, scriptType, callerAccountAddress, releaseVersion } =
			req.params;
		console.log(req.params);
		try {
			const trx = await tokenContract.methods
				.getEncryptedData(appName, scriptType, releaseVersion)
				.call({ from: callerAccountAddress });
			console.log('trx', JSON.stringify(Object.values(trx)[1]));
			const stringArray = JSON.stringify(Object.values(trx)[1]);
			console.log(JSON.parse(stringArray));
			res.status(400).json({
				data: trx,
			});
		} catch (error) {
			res.status(400).json({
				message: error,
			});
		}
	}
);

//store tablesss
router.post('/storeTableData', async (req, res) => {
	const {
		appName,
		applicationSysId,
		releaseLabel,
		scriptIncludeList,
		clientScriptsList,
		businessRulesList,
		totalScriptIncludes,
		totalClientScripts,
		totalBusinessRules,
		callerPrivateKey,
		callerAccountAddress,
	} = req.body;

	console.log('callerAccountPrivateKey', callerPrivateKey);
	console.log('callerAccAddre', callerAccountAddress);

	//creating encrypted scriptInclude
	const finalEncryptedSI = [];
	scriptIncludeList.map((data) => {
		let newData = {
			sysId: data.sysId,
			script: SHA256(data.script + data.sysId).toString(),
		};
		finalEncryptedSI.push(JSON.stringify(newData));
	});

	//creating encrypted clientScripts
	const finalEncryptedCS = [];
	clientScriptsList.map((data) => {
		let newData = {
			sysId: data.sysId,
			script: SHA256(data.script + data.sysId).toString(),
		};
		finalEncryptedCS.push(JSON.stringify(newData));
	});

	//creating encrypted businessRules
	const finalEncryptedBR = [];
	businessRulesList.map((data) => {
		let newData = {
			sysId: data.sysId,
			script: SHA256(data.script + data.sysId).toString(),
		};
		finalEncryptedBR.push(JSON.stringify(newData));
	});

	//@need to check dont forget

	web3Provider.eth.accounts.wallet.add(callerPrivateKey);
	try {
		console.log('adding tableData to blockchain');

		console.log('appName', appName);
		console.log('releaseLabel', releaseLabel);
		console.log('finalEncryptedSI', finalEncryptedSI.length);
		console.log('finalEncryptedCS', finalEncryptedCS.length);
		console.log('finalEncryptedBR', finalEncryptedBR.length);

		// 1 create smart contract transaction
		const trx = tokenContract.methods.addApplicationData(
			appName,
			releaseLabel,
			finalEncryptedSI,
			finalEncryptedCS,
			finalEncryptedBR,
			1,
			2,
			2
		);
		// // 2 calculate gas fee
		const gas = await trx.estimateGas({ from: callerAccountAddress });
		console.log('gas :>> ', gas);
		// // // 3 calculate gas price
		const gasPrice = await web3Provider.eth.getGasPrice();
		// console.log('gasPrice :>> ', gasPrice);
		// 4 encode transaction data
		const data = trx.encodeABI();
		console.log('data :>> ', data);
		// 5 get transaction number for wallet
		const nonce = await web3Provider.eth.getTransactionCount(
			callerAccountAddress
		);
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
			gasPrice: 0,
			nonce,
		};

		console.log('Transaction ready to be sent');
		/** 7 send transaction, it'll be automatical/ly signed
	because the provider has already the wallet **/
		const receipt = await web3Provider.eth.sendTransaction(trxData);
		console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
		console.log('receipt', receipt);

		res.json({
			data: receipt,
		});
	} catch (error) {
		console.error('Error in transferTokens >', error);
		res.status(400).json({
			message: error,
		});
	}
});

// program to extract value as an array from an array of objects

function compareArrays(arr1, arr2) {
	console.log('this ran');
	let totalRecords;
	let totalRecordsMessage;
	let sysIdChanges;
	let scriptChangeAts;

	// console.log('arr', arr1.length, arr2.length);

	// check the length
	if (arr1.length != arr2.length) {
		totalRecords = false;
		totalRecordsMessage = arr2.length;
	} else {
		// console.log('this ran2');
		totalRecords = true;
		totalRecordsMessage = arr2.length;

		console.log(totalRecords);

		// comparing each element of array
		let sysIdChange = [];
		let scriptChangeAt = [];
		for (let i = 0; i < arr1.length; i++) {
			// console.log('this ran 3', JSON.parse(arr1[i]).sysId);
			// console.log('objects', arr1[i].sysId);
			if (JSON.parse(arr1[i]).sysId !== JSON.parse(arr2[i]).sysId) {
				// console.log('change in this sys_id', arr1[i].sysId, arr2[i].sysId);
				sysIdChange.push(JSON.parse(arr1[i]).sysId);
			}
			sysIdChanges = sysIdChange;

			if (JSON.parse(arr1[i]).script !== JSON.parse(arr2[i]).script) {
				// console.log('change in the script for sysId with', arr1[i].sysId);
				scriptChangeAt.push(JSON.parse(arr1[i]).sysId);
			}
			scriptChangeAts = scriptChangeAt;
		}
	}
	return {
		totalRecords,
		totalRecordsMessage,
		sysIdChanges,
		scriptChangeAts,
	};
}

//the heart function of the blockchain
router.post('/compare', async (req, res) => {
	const {
		releaseLabel,
		appName,
		scriptIncludeList,
		clientScriptsList,
		businessRulesList,
		callerAccountAddress,
		callerPrivateKey,
	} = req.body;

	try {
		//creating encrypted scriptInclude
		const finalEncryptedSI = [];
		scriptIncludeList.map((data) => {
			let newData = {
				sysId: data.sysId,
				script: SHA256(data.script + data.sysId).toString(),
			};
			finalEncryptedSI.push(JSON.stringify(newData));
		});

		//creating encrypted clientScripts
		const finalEncryptedCS = [];
		clientScriptsList.map((data) => {
			let newData = {
				sysId: data.sysId,
				script: SHA256(data.script + data.sysId).toString(),
			};
			finalEncryptedCS.push(JSON.stringify(newData));
		});

		//creating encrypted businessRules
		const finalEncryptedBR = [];
		businessRulesList.map((data) => {
			let newData = {
				sysId: data.sysId,
				script: SHA256(data.script + data.sysId).toString(),
			};
			finalEncryptedBR.push(JSON.stringify(newData));
		});

		const trx = await tokenContract.methods
			.getApplicationByReleaseAndName(releaseLabel, appName)
			.call({ from: callerAccountAddress });
		console.log('trx', trx);
		// console.log('trx',Object.values(trx)[1]);
		const stringArraySI = JSON.stringify(Object.values(trx)[2]);
		// console.log(JSON.parse(stringArray));
		const toBeComparedDataSI = JSON.parse(stringArraySI);
		const comparedResultForSI = compareArrays(
			finalEncryptedSI,
			toBeComparedDataSI
		);

		const stringArrayCS = JSON.stringify(Object.values(trx)[3]);
		// console.log(JSON.parse(stringArray));
		const toBeComparedDataCS = JSON.parse(stringArrayCS);
		const comparedResultForCS = compareArrays(
			finalEncryptedCS,
			toBeComparedDataCS
		);

		const stringArrayBR = JSON.stringify(Object.values(trx)[4]);
		// console.log(JSON.parse(stringArray));
		const toBeComparedDataBR = JSON.parse(stringArrayBR);
		const comparedResultForBR = compareArrays(
			finalEncryptedBR,
			toBeComparedDataBR
		);

		const { totalRecords, totalRecordsMessage, sysIdChanges, scriptChangeAts } =
			comparedResultForSI;
		web3Provider.eth.accounts.wallet.add(callerPrivateKey);
		// 1 create smart contract transaction
		const trx2 = await tokenContract.methods.addCompareResultData(
			appName,
			releaseLabel,
			'Adani',
			comparedResultForSI.scriptChangeAts,
			comparedResultForCS.scriptChangeAts,
			comparedResultForBR.scriptChangeAts,
			comparedResultForSI.scriptChangeAts.length,
			comparedResultForCS.scriptChangeAts.length,
			comparedResultForCS.scriptChangeAts.length
		);
		// 2 calculate gas fee
		const gas = await trx2.estimateGas({ from: callerAccountAddress });
		// 3 calculate gas price
		const gasPrice = await web3Provider.eth.getGasPrice();
		// 4 encode transaction data
		const data = trx2.encodeABI();
		// 5 get transaction number for wallet
		const nonce = await web3Provider.eth.getTransactionCount(
			callerAccountAddress
		);
		// 6 build transaction object with all the data
		const trxData2 = {
			// trx is sent from the wallet
			from: callerAccountAddress,
			// trx destination is the ERC20 token contract
			to: address,
			/** data contains the amount an recepient address params for transfer contract method */
			data,
			gas,
			gasPrice: 0,
			nonce,
		};

		console.log('Transaction ready to be sent');
		/** 7 send transaction, it'll be automatical/ly signed
		because the provider has already the wallet **/
		const receipt = await web3Provider.eth.sendTransaction(trxData2);
		console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
		console.log('receipt', receipt);

		const responseData = {
			totalRecordsSI: comparedResultForSI.totalRecordsMessage,
			scriptChangeAtSI: comparedResultForSI.scriptChangeAts,
			totalRecordsCS: comparedResultForCS.totalRecordsMessage,
			scriptChangeAtCS: comparedResultForCS.scriptChangeAts,
			totalRecordsBR: comparedResultForBR.totalRecordsMessage,
			scriptChangeAtBR: comparedResultForBR.scriptChangeAts,
		};

		res.status(200).json({
			data: responseData,
			// txHash: receipt.transactionHash,
		});
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
		});
	}
});

//check the client's checker count
router.post('/getClientCheckerCount', async (req, res) => {
	const { clientAddress } = req.body;
	console.log('clientAddress', clientAddress);
	try {
		const trx = await tokenContract.methods.checkerCount(clientAddress).call();
		console.log('trx', trx);
		res.status(200).json({
			data: trx,
		});
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
});

//only for vendor
router.post('/getClientCheckResult', async (req, res) => {
	const { clientAddress, checkerCount, callerAccountAddress } = req.body;
	try {
		const trx = await tokenContract.methods
			.getClientCheckData(clientAddress, checkerCount)
			.call({ from: callerAccountAddress });
		const trx2 = await tokenContract.methods
			.clientCheckResults(checkerCount, clientAddress)
			.call();

		res.status(200).json({
			data: {
				...trx2,
				sysIdChangesAt: trx['0'],
				scriptChangesAt: trx['1'],
			},
		});
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
});

module.exports = router;
