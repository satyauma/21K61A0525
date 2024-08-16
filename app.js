import express from "express";
const axios = require("axios");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNzg5MzY4LCJpYXQiOjE3MjM3ODkwNjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjUxZjY0NjkzLWNmZjgtNGViMy05NmQzLWQwY2FjMjdkYTljNyIsInN1YiI6InNhdHlhdW1hLmNoaW5uYWxhQHNhc2kuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTYXNpIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5IGFuZCBFbmdpbmVlcmluZyIsImNsaWVudElEIjoiNTFmNjQ2OTMtY2ZmOC00ZWIzLTk2ZDMtZDBjYWMyN2RhOWM3IiwiY2xpZW50U2VjcmV0IjoiYnVvZ1FhWlljZkFtenl0ViIsIm93bmVyTmFtZSI6IlNhdHlhdW1hIiwib3duZXJFbWFpbCI6InNhdHlhdW1hLmNoaW5uYWxhQHNhc2kuYWMuaW4iLCJyb2xsTm8iOiIyMUs2MUEwNTI1In0.3KQZGRXPQtgy4C0RuJVg5ORzUwYTrWLgoWEK9ashi6E';

const app = express();
const port = process.env.port || 5000;

app.use(express.json())

app.get('/numbers',async (res,req)=>{
    try{

        const authHeader = req.headers.authorization;
        if(!authHeader || authHeader!== `Bearer ${token}`){
            return res.statusCode(401)
        }
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