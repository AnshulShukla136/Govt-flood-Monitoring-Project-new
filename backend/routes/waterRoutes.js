const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {uploadWater,getAdminAll,getUserData} = require("../controllers/waterController");

const router = express.Router();

const storage = multer.diskStorage({
  destination:(req,file,cb)=> cb(null,"uploads"),
  filename:(req,file,cb)=> cb(null,Date.now()+"-"+file.originalname)
});
const upload = require("../middleware/multer");


router.post("/upload", auth, upload.single("image"), uploadWater);
router.get("/all", auth, role("admin"), getAdminAll);
router.get("/user", auth, getUserData);

module.exports = router;
