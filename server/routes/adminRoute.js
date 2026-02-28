const router = require("express").Router();
const { deltUser, getUsers, unblockUser, blockUser } = require("../controllers/adminController");
const userAuth = require("../middleWare/authMiddleware");

router.get("/", getUsers);
router.delete("/delete-user/:id", userAuth, deltUser);
router.put("/block-user/:id", userAuth, blockUser);
router.put("/unblock-user/:id", userAuth, unblockUser);

module.exports = router;
