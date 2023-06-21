const { signup, signin, ProtectedRoutes, allowedTo } = require("./user.auth");
const { createUser, getUsers, getUser, updateUser, deleteUser, changePassword } = require("./user.service");

const router = require("express").Router();

router.route("/").post(ProtectedRoutes, allowedTo('admin'), createUser).get(ProtectedRoutes, allowedTo('admin'), getUsers);
router
    .route("/:id")
    .get(ProtectedRoutes, allowedTo('admin'), getUser)
    .put(ProtectedRoutes, allowedTo('admin'), updateUser)
    .delete(ProtectedRoutes, allowedTo('admin'), deleteUser);
router.patch('/changePassword/:id', ProtectedRoutes, allowedTo('admin'), changePassword)
router.post('/signup', signup)
router.post('/signin', signin)
module.exports = router;
