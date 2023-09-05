const express = require("express");
const { users } = require("../../controllers");

const router = express.Router();
const auth = require("../../middlewares/auth");

router.post("/register", users.register);

router.post("/login", users.login);

router.post("/logout", auth, users.logout);

router.get("/current", auth, users.getCurrent);

module.exports = router;
