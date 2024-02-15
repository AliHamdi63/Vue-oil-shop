const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL)

async function products() {
    await client.connect();
    const db = client.db('fsv-db');

    router.get('/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        res.json(products);
    });

    router.get('/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({ id: productId });
        res.json(product);
    });
}

products();

module.exports = router;

