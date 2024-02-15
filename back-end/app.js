require('dotenv').config();
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, './assets')));

app.use('/api', require('./routes/productsRouter'));

app.use('/api', require('./routes/cartRouter'));


app.listen(PORT, () => {
    console.log(`Server is listening on  Port ${PORT}`);
})