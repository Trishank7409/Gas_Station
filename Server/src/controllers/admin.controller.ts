import { Request, Response } from "express";
import GasStation,{IStation} from "../modals/gasStation.modal";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { Station } from "../types/types";
import Joi from "joi";
import getCoordinates from "../utils/geocoding";
import User, { IUser } from "../modals/user.modal";
export default  class{

    // Create Gas Station
    public static createStation = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const userId= req.params.id
        const { name, address, city, state, Gas_Price, lat, lng, status }: IStation = req.body;
        const data: Station = { name, address, city, state, Gas_Price, lat, lng, status };
        const { error } = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            Gas_Price: Joi.number().required(),
            lat: Joi.number().required(),
            lng: Joi.number().required(),
            status: Joi.boolean().required(),
            
        }).validate(data);
        
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const user: IUser | null= await User.findById(userId)
            if(!user){
                console.log("No user Found")
            }
        const station = await GasStation.create({ ...data, created_by: user?.fullName });
        return res.status(201).json({ message: "Gas Station Created Successfully", data: station });
        } catch (error) {
            throw new ApiError(400, "Error in creating the station");   
        }

        // const newStation = new GasStation(data;
    });


    // Update Gas price of the particular gas station
    public static updateGasPrice = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
       const stationId= req.params.id
        const { Gas_Price } = req.body;
        const data = { Gas_Price };
        const { error } = Joi.object({
            Gas_Price: Joi.number().required(),
        }).validate(data);
        
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


    try {  
        // const station = await GasStation.findById(stationId);   
        const updatedStation = await GasStation.findByIdAndUpdate(stationId, data, { new: true });
        if(!updatedStation){
        throw new ApiError(400, "Error in updating the station");
        }
        return res.status(200)
        .json(new ApiResponse(200, updatedStation, "Gas Price Updated successfully"));
        
    } catch (error) {
        throw new ApiError(400, "Error in updating the station");
                     }
    });

    // Delete the station
    public static deleteGasStation = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const stationId= req.params.id
     try {  
         // const station = await GasStation.findById(stationId);   
         const deleteStation = await GasStation.findByIdAndDelete(stationId);
         if(!deleteStation){
         throw new ApiError(400, "Error in deleting the station");
         }
         return res.status(200)
         .json(new ApiResponse(200, deleteStation, "Gas station remove successfully"));
         
     } catch (error) {
         throw new ApiError(400, "Error in deleting the station");
                      }
     });

    //  get the location of the cordinates based on place name

    public static getLocation =asyncHandler(async(req:Request, res:Response): Promise<Response>=>{
        const {placeName}=req.body
        const data={placeName}
        try {

            const response =await getCoordinates(data)
            return res.status(200)
            .json(new ApiResponse(200, response, "Location found successfully"));
        } catch (error) {
            throw new ApiError(400, "Error in finding the location");        
        }
    })

    // Get all Station based on created by
    public static getStationByCreatedBy = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const createdBy = req.params.id
        try {
            const user= await User.findById(createdBy)
            console.log("user",user)
            const station = await GasStation.find({ created_by: user?.fullName });
            return res.status(200)
               .json(new ApiResponse(200, station, "Station found successfully"));
        } catch (error) {
            throw new ApiError(400, "Error in finding the station");
        }
        // return res.status(200)
        //    .json(new ApiResponse(200, station, "Station found successfully"));
    });

}