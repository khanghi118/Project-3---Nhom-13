import express from "express";
import { registerController, loginController, testController,forgotPasswordController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req,res)=> {
    res.status(200).send({ok:true});
})
router.get("/admin-auth", requireSignIn,isAdmin, (req,res)=> {
    res.status(200).send({ok:true});
})
router.post("/forgot-password", forgotPasswordController)

export default router;