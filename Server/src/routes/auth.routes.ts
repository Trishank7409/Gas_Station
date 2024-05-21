import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router: Router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/loggedOut', AuthController.logout);


export default router;