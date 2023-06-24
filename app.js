const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('Product');
    res.send('<h1>Product</h1>')
});

app.use('/', (req, res, next) => {
    console.log('Birinci Midlware');
    res.send('<h1>Express JS</h1>')
});

app.listen(3000);