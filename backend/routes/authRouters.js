const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/login").post(authController.loginUser);
router.route("/logout").post(authController.logoutUser);
router.route("/refresh").get(authController.refreshToken);

module.exports = router;
