import { Router } from "express";
import adminController from "../controllers/admin.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const StationRouter: Router = Router();


StationRouter.route('/create-station/:id').post(AuthMiddleware, adminController.createStation);
StationRouter.route('/update-price/:id').put(AuthMiddleware, adminController.updateGasPrice);
StationRouter.route('/delete-station/:id').delete(AuthMiddleware, adminController.deleteGasStation);
StationRouter.route('/location').get(adminController.getLocation) ;
StationRouter.route('/getStation/:id').get(AuthMiddleware,adminController.getStationByCreatedBy) ;


export default StationRouter;