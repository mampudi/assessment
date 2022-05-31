import { curry } from 'lodash';
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
var initialBlock = 0;
export async function avgServiceStart(numberOfBlocks: number) {
    logger.info('avg.web3.service starting for ' + numberOfBlocks + ' number of blocks');
    initialBlock = await web3.eth.getBlockNumber();
    //caluclate average for the current block
    await GetTransactions(initialBlock);
    logger.info('Initial Block ' + initialBlock)
    //loop by the number of block, set i=1 because the current block was already done
    for(let i=1;i<numberOfBlocks;i++)
    {
        var currentBlock = initialBlock - i;
        //calculate average gas for the last number of blocks
        //it will keep a running total acrosss the number of blocks
        await GetTransactions(currentBlock);
        logger.info('Current block = ' + currentBlock)
    }

    

    web3.eth.subscribe('newBlockHeaders', function(error:any, result:any){
        if (error) {
            logger.error(error);
            return;
        }
    })
    .on("data", function(blockHeader:any){
        GetTransactions(blockHeader.number);
        initialBlock = blockHeader.number;
        logger.info('Initial Block ' + blockHeader.number);
        for(let i=1;i<numberOfBlocks;i++)
        {
            var currentBlock = initialBlock - i;
            GetTransactions(currentBlock);
            logger.info('Current block = ' + currentBlock)
        }
    })
    .on("error", console.error);

    
}

export async function GetTransactions(blockNumber:any){
    latestBlock= blockNumber;
    var Block = await web3.eth.getBlock(latestBlock)
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

export async function getAvgEstimatedGas() {
    average = fee/totalBaseTransations;
    return { "initlaBlockNumber":initialBlock,"minBlockNumber":latestBlock, "averageFeeEstimate": average, "totalTransactionCount": totalTransations, "baseCurrencyTransactionsCount": totalBaseTransations, "totalBaseGasPrice": fee};
  }

  export async function setTotalBaseGasPrice(totalBaseGasPrice:number) {
    fee = totalBaseGasPrice;
  }

  export async function setTotalBaseTransations(transactions:number) {
    totalBaseTransations = transactions;
  }