const router = require("express").Router();
const UserCntrl = require("../Controller/UserCntrl");
const auth = require("../middlewares/auth");

router.post("/login", UserCntrl.login);
router.get("/token", UserCntrl.refreshtoken);
router.get("/logout", UserCntrl.logout);
router.get("/userProfile", auth, UserCntrl.userProfile);
router.post("/register",  UserCntrl.register);

module.exports = router;
