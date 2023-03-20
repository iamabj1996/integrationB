const address = '0x23f51A80c5969dE449e89866B7568F82CB8a83aB';

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_clientAddress","type":"address"}],"name":"addClients","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrayOfClientAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"checkerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"clientAddressess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"clientCheckResults","outputs":[{"internalType":"bool","name":"totalRecords","type":"bool"},{"internalType":"uint256","name":"totalRecordsMessage","type":"uint256"},{"internalType":"uint256","name":"checkerCount","type":"uint256"},{"internalType":"string","name":"tableName","type":"string"},{"internalType":"string","name":"appName","type":"string"},{"internalType":"string","name":"typeOfScript","type":"string"},{"internalType":"string","name":"releaseVersion","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClientAddress","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_clientAddress","type":"address"},{"internalType":"uint256","name":"_checkerCount","type":"uint256"}],"name":"getClientCheckData","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_appName","type":"string"},{"internalType":"string","name":"_typeOfScript","type":"string"},{"internalType":"string","name":"_releaseVersion","type":"string"}],"name":"getEncryptedData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_totalRecords","type":"bool"},{"internalType":"uint256","name":"_totalRecordsMessage","type":"uint256"},{"internalType":"string[]","name":"_sysIdChanges","type":"string[]"},{"internalType":"string[]","name":"_scriptChangeAts","type":"string[]"},{"internalType":"address","name":"_clientAddress","type":"address"},{"internalType":"string","name":"_appName","type":"string"},{"internalType":"string","name":"_typeOfScript","type":"string"},{"internalType":"string","name":"_releaseVersion","type":"string"},{"internalType":"string","name":"_tableName","type":"string"}],"name":"storeClientCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_appName","type":"string"},{"internalType":"string","name":"_tableName","type":"string"},{"internalType":"string","name":"_typeOfScript","type":"string"},{"internalType":"string","name":"_releaseVersion","type":"string"},{"internalType":"string[]","name":"_encryptedData","type":"string[]"}],"name":"storeEncryptedData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"name":"tables","outputs":[{"internalType":"string","name":"tableName","type":"string"}],"stateMutability":"view","type":"function"}];
module.exports = {address , abi};