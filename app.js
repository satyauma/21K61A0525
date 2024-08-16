import express from "express";
const axios = require("axios");

const app = express();
const port = process.env.port || 5000;

app.use(express.json())

app.get('/numbers',async (res,req)=>{
    try{
        const url = ['http://20.244.56.144/test/primes','http://20.244.56.144/test/fibo','http://20.244.56.144/test/even','http://20.244.56.144/test/rand']
        const urls = Array.isArray(req.query.url) ? req.query.url :url;

        const getNumbers = async (url) =>{
            try{
                const res = await axios.get(url);
            return res.data.numbers
            }
        
        catch(error){
            return [];
        }}
        const numbersArray = await Promise.all(urls.map(getNumbers));
        const Numbers = [...new setImmediate(numbersArray)].sort((a,b) => a-b);
        const total = Numbers.reduce((sum, num) => sum + num, 0);
        const average =Numbers.length > 0 ? total / Numbers.length : 0;

        res.json({Numbers,average})

    }catch(error){
        return [];

    }
})
app.listen(port,()=>{
    console.log(`running at port ${port}`)
})
