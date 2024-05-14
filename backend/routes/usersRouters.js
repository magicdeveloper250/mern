const express = require("express");
const userController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
router.use(verifyJWT);
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/:id").get(userController.getOneUser);
module.exports = router;
