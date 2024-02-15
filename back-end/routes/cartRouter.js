const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL)

async function cart() {
    await client.connect();
    const db = client.db('fsv-db');

    router.get('/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;
        const user = await db.collection('users').findOne({ id: userId });
        const populatedCart = await populatedCartIds(user.cartItems)
        res.json(populatedCart);

    });

    router.post('/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.body.id;
        await db.collection('users').updateOne({ id: userId }, {
            // $push: { cartItems: productId }
            $addToSet: { cartItems: productId } // to prevent duplicates
        });
        const user = await db.collection('users').findOne({ id: userId });
        const populatedCart = await populatedCartIds(user.cartItems)
        res.json(populatedCart);
    });

    router.delete('/users/:userId/cart/:productId', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.productId;
        await db.collection('users').updateOne({ id: userId }, {
            $pull: { cartItems: productId }
        });
        const user = await db.collection('users').findOne({ id: userId });
        const populatedCart = await populatedCartIds(user.cartItems)
        res.json(populatedCart);
    });

    async function populatedCartIds(ids) {
        return Promise.all(ids.map(id => db.collection('products').findOne({ id })));

    }
}

cart();

module.exports = router;
