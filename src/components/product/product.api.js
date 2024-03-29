const { uploadMixOfFiles } = require("../../utils/fileUpload");
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("./product.service");

const router = require("express").Router();
let fields = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 3 }]
router.route("/").post(ProtectedRoutes,allowedTo('user'),uploadMixOfFiles(fields, 'product'), createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(ProtectedRoutes,allowedTo('user'),updateProduct)
  .delete(ProtectedRoutes,allowedTo('user'),deleteProduct);

module.exports = router;
