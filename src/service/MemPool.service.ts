import logger from '../utils/logger';
require('dotenv').config()
const url = process.env.RPC_URL;

const Web3 = require("web3")
var web3 = new Web3(url);

export async function check() {
    const subscription = web3.eth.subscribe('pendingTransactions', (err:any, res:any) => {
        if (err) console.error(err);
    });
    subscription.on('data', (txHash:any) => {
        setTimeout(async () => {
             try {
                 let tx = await web3.eth.getTransaction(txHash);
                 if (tx) {
                     logger.info(tx);
                 }
             } catch (err) {
                 console.error(err);
             }
        })
    });
    
}
