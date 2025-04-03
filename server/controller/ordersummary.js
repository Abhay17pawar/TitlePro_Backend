const OrderSummary = require("../model/orderSummary");

// Controller to get all order summaries
const getAllOrderSummaries = async (req, res) => {
    try {
        const summaries = await OrderSummary.findAll();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get an order summary by order number
const getOrderSummaryByOrderNumber = async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const summary = await OrderSummary.findByOrderNumber(orderNumber);
        if (!summary) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





// Controller to get the status of a specific order by order number
const getOrderStatusByOrderNumber = async (req, res) => {
    const { orderNumber } = req.params;

    try {
        const status = await OrderSummary.getOrderStatusByOrderNumber(orderNumber);
        if (!status) {
            return res.status(404).json({ message: `Order with number ${orderNumber} not found` });
        }

        res.status(200).json({ orderNumber, status });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order status", error: error.message });
    }
};

module.exports = {
    getOrderSummaryByOrderNumber,
    getAllOrderSummaries,
    getOrderStatusByOrderNumber,
};
