const express = require("express");
const { users } = require("../../controllers");

const router = express.Router();
const { auth, upload } = require("../../middlewares");

router.post("/register", users.register);

router.post("/login", users.login);

router.post("/logout", auth, users.logout);

router.get("/current", auth, users.getCurrent);

router.patch("/avatars", auth, upload.single("avatar"), users.updateAvatar);

module.exports = router;
