const Order = require("../models/OrderModel");

const orderCntrl = {
  addOrderItem: async (req, res) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        res.status(400).json({ msg: "Orders Not Found" });
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getOrderDetail: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ msg: "order Not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  orderPayments: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log(order);
      if (order) {
        (order.isPaid = true),
          (order.paidAt = Date.now()),
          (order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
          });
        const updateOrder = await order.save();
        res.json(updateOrder);
      } else {
        res.status(404).json({ msg: "order Not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getMyOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      if (orders) {
        res.json(orders);
      } else {
        res.status(404).json({ msg: "No orders found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = orderCntrl;
