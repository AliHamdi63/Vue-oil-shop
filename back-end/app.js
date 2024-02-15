require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, './assets')));

app.use('/apis', require('./routes/productsRouter'));

app.use('/apis', require('./routes/cartRouter'));


app.listen(PORT, () => {
    console.log(`Server is listening on  Port ${PORT}`);
})