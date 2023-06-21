
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { addItemToCart, removeFromCart, updateQuantity, applyCoupon, getUserCart } = require("./cart.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo('user'))
router.route("/").post(addItemToCart).delete(removeFromCart).put(updateQuantity).get(getUserCart)
router.post('/applyCoupon',applyCoupon)
module.exports = router;
