const router = require("express").Router();
const auth = require("../middlewares/auth");
const orderCntrl = require("../Controller/OrderCntrl");

//craete new order
router.post("/order", auth, orderCntrl.addOrderItem);
router.get("/order/:id", auth, orderCntrl.getOrderDetail);
router.put("/order/:id/pay", auth, orderCntrl.orderPayments);
router.get("/myorders", auth, orderCntrl.getMyOrders);

module.exports = router;
