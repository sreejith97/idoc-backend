const express = require("express");
const { addUser, userLogin,userFeed,checkFeed } = require("../Controller/user");
const router = express.Router();

router.route("/signup").post(addUser);
router.route("/signin").post(userLogin);

router.route("/feedback").post(userFeed);
router.route("/feedbackchk").post(checkFeed);
module.exports = router;
