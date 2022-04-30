const http = require('http');
const port = 3000;
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.get('/api', (req, res) => {
    res.send(`Server running on port ${port}`);
})

app.get('/api/fibonacci', (req, res) => {
    const limit = parseInt(req.query.limit);
    let num1 = 0;
    let num2 = 1;
    let arr = [];
    while (num1 <= limit) {
        arr.push(num1);
        let nextTerm = num1 + num2;
        num1 = num2;
        num2 = nextTerm;
    }
    res.status(200).send({ data: arr, message: 'Fibonacci series fetched successfully' });
});

app.post('/api/permutation', (req, res) => {
    const arr1 = req.body.arr1;
    const arr2 = req.body.arr2;
    const arr3 = req.body.arr3;

    if (arr1.length === 0 || arr2.length === 0 || arr3.length === 0) {
        res.status(500).send({ error: true, message: 'Array can not be empty' });
    }

    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            for (let k = 0; k < arr3.length; k++) {
                result.push(`${arr1[i]},${arr2[j]},${arr3[k]}`);
            }
        }
    }
    let arr = [...new Set(result)];
    res.status(200).send({ data: arr, message: 'Combination fetched successfully' });
})


const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));