const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    // Validate required fields
    if (!order.item || !order.quantity || !order.user) {
      return res
        .status(400)
        .send({ message: "Item, quantity, and user are required fields." });
    }

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).send({ message: "Error creating order.", error });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).send({ message: "Error retrieving order.", error });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(400).send({ message: "Error updating order.", error });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({ message: "Order deleted successfully.", order });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send({ message: "Error deleting order.", error });
  }
};
