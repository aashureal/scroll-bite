const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const router = Router();

router.post("/user/register", authController.registerUser);

module.exports = router;
