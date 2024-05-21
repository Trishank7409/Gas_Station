import { Router } from "express";
import AuthRoutes from "./auth.routes";
import StationRouter from "./station.routes";
const router: Router = Router();



router.use('/auth', AuthRoutes);
router.use('/station',StationRouter)


export default router;