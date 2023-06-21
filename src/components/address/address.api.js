
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { getUserAddresses, deleteAddress, addAddress } = require("./address.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo('user'))
router.route("/").patch(addAddress)
    .delete(deleteAddress)
    .get(getUserAddresses)

module.exports = router;
