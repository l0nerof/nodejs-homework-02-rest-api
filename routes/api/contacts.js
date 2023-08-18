const express = require("express");
const contacts = require("../../controllers");

const router = express.Router();

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getById);

router.post("/", contacts.add);

router.delete("/:contactId", contacts.removeById);

router.put("/:contactId", contacts.updateById);

module.exports = router;
