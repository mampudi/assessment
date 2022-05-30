import logger from '../utils/logger';
require('dotenv').config()
const url = process.env.RPC_URL;

const Web3 = require("web3")
var web3 = new Web3(url);

var gasEstimate = 0;
var average = 0;
var totalTransations = 0;
var totalBaseTransations = 0;
var fee = 0;
var latestBlock = 0;

export async function start() {
    logger.info('web3.service starting');
    gasEstimate = await web3.eth.getGasPrice(); //avg gas price
    logger.info('gasEstimate = ' + gasEstimate);

    await GetTransactions(await web3.eth.getBlockNumber());

    web3.eth.subscribe('newBlockHeaders', function(error:any, result:any){
        if (error) {
            logger.error(error);
            return;
        }
    })
    .on("data", function(blockHeader:any){
        GetTransactions(blockHeader.number);
    })
    .on("error", console.error);
    
}

export async function GetTransactions(blockNumber:any){
    latestBlock= blockNumber;
    var Block = await web3.eth.getBlock(latestBlock)
    totalTransations = 0;
    totalBaseTransations = 0;
    fee = 0;
    Block.transactions.forEach(async(transactionAddress: any) => {
        totalTransations++;
        let t = await web3.eth.getTransaction(transactionAddress);

        //Only the transaction fee for sending the base currency should be included (i.e.
        //ignore erc20 transfer etc. if possible)
        if(t.value > 0)
        {
            totalBaseTransations++;
            //logger.info(t.gasPrice);
            fee = fee + Number(t.gasPrice);
        }
    })
}

export async function getEstimatedGas() {
    average = fee/totalBaseTransations;
    return { "blockNumber":latestBlock, "gasEstimate": average, "totalTransactionCount": totalTransations, "baseCurrencyTransactionsCount": totalBaseTransations, "totalBaseGasPrice": fee};
  }

  export async function setTotalBaseGasPrice(totalBaseGasPrice:number) {
    fee = totalBaseGasPrice;
  }

  export async function setTotalBaseTransations(transactions:number) {
    totalBaseTransations = transactions;
  }