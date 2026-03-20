const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {getStats} = require("../controllers/statsController");

const router = express.Router();

router.get("/", auth, role("admin"), getStats);

module.exports = router;
