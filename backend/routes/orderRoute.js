const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getUserOrders,
  getAllOrdersAmount,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatonUser, authorizeRole } = require("../middleware/auth");

router.route("/order").post(isAuthenticatonUser, newOrder);

router
  .route("/single/order/:id")
  .get(isAuthenticatonUser, authorizeRole("admin"), getSingleOrder);

router
  .route("/all/orders/user")
  .get(isAuthenticatonUser, authorizeRole("admin"), getUserOrders);

router
  .route("/get/order/amount")
  .get(isAuthenticatonUser, authorizeRole("admin"), getAllOrdersAmount);

router.route("/update/order/:id").put(isAuthenticatonUser, updateOrder);

router.route("/delete/order/:id").delete(deleteOrder);

module.exports = router;
