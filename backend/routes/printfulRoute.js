// routes.js
const express = require('express');
const router = express.Router();
const printfulService = require('../controller/printfulService');

const YOUR_STORE_ID = '13718088'; // Your store ID

router.get('/store/products', async (req, res) => {
    try {
        const products = await printfulService.getStoreProducts(YOUR_STORE_ID);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/store/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await printfulService.getSingleProduct(productId, YOUR_STORE_ID);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// List all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await printfulService.listOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single order by ID
router.get('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await printfulService.getOrder(orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new order
router.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const createdOrder = await printfulService.createOrder(orderData);
        res.json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an order by ID
router.put('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const orderData = req.body;
    try {
        const updatedOrder = await printfulService.updateOrder(orderId, orderData);
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an order by ID
router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        await printfulService.deleteOrder(orderId, YOUR_STORE_ID);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;   
