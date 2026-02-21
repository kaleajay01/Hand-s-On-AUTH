const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", authController.addUser);
router.post("/login", authController.loginUser);

// Protected route: requires Authorization: Bearer <token>
router.get("/me", verifyToken, authController.getMe);

module.exports = router;
