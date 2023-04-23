const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  getProdcutById,
  createProductReviews,
  getProductReviews,
  deleteReview,
} = require("../controllers/productsControllers");

const { isAuthenticatonUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products/new")
  .post(isAuthenticatonUser, authorizeRole("admin"), createProducts);

router
  .route("/admin/products/:id")
  .put(isAuthenticatonUser, authorizeRole("admin"), updateProducts)
  .delete(isAuthenticatonUser, authorizeRole("admin"), deleteProducts);

router.route("/products/:id").get(getProdcutById);

router.route("/reviews").put(isAuthenticatonUser,createProductReviews);

router.route("/getProductReview").get(isAuthenticatonUser,getProductReviews);

router.route("/delet/review").delete(isAuthenticatonUser,deleteReview);

module.exports = router;
