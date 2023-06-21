
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { addToWishlist, deleteFromWishlist, getUserWishlists } = require("./wishlist.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo('user'))
router.route("/").patch(addToWishlist)
    .delete(deleteFromWishlist)
    .get(getUserWishlists)

module.exports = router;
