const express = require('express');
const { addUser, findUser } = require("./user.controller.js"); // Adjust the path accordingly

const router = express.Router();

router.post("/signup", addUser);
router.post("/login", findUser);

module.exports = router;