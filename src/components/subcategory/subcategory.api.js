const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./subcategory.service");

const router = require("express").Router({mergeParams:true});

router.route("/").post(ProtectedRoutes,allowedTo('user'),createSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(ProtectedRoutes,allowedTo('user'),updateSubCategory)
  .delete(ProtectedRoutes,allowedTo('user'),deleteSubCategory);

module.exports = router;
