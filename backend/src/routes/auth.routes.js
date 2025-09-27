import express from "express";
import { handleLogin, handleSignUp, handleConfirmSignup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/confirm", handleConfirmSignup);

export default router;
