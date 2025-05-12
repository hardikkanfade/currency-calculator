import https from 'https';
import readline from 'readline';
import chalk from 'chalk';
import { REPL_MODE_STRICT } from 'repl';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const apikey = 'ad83912fccd3c9a2f6ee9eb7';
const url = ' https://v6.exchangerate-api.com/v6/ad83912fccd3c9a2f6ee9eb7/latest/USD'

https.get(url,(response)=>{
    let data="";
    response.on('data',(chunk)=>{
        data+=chunk;
    })
    response.on('end',()=>{
        const result = JSON.parse(data).conversion_rates;
        console.log(result);
        rl.question("Enter the amount in USD",(amount)=>{
            rl.question("Enter the target currency",(currency)=>{
                console.log((result[currency.toUpperCase()]*amount).toFixed(2)); 
                rl.close();
            })
        })
    })
    response.on('error',(err)=>{
        console.log('Error');  
        rl.close();          
    })
});