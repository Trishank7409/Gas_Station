import { Request, Response } from "express";
import { RequestUserSignupData, RequestUserLoginData } from "../types/types";
import Joi from "joi";
import User, { IUser } from "../modals/user.modal";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";


export default class {
// Sign up
    public static signup = asyncHandler (async (req: Request, res: Response): Promise<Response> => {

        const { fullName, email, role, password, confirmPassword }: RequestUserSignupData = req.body;
        const data: RequestUserSignupData = { fullName, email, role, password, confirmPassword };


        const { error } = Joi.object({
            fullName: Joi.string().required().max(200),
            email: Joi.string().required().max(250).email(),
            role: Joi.string().required(),
            password: Joi.string().required().min(8),
            confirmPassword: Joi.string().required().equal(Joi.ref('password'))
        }).validate(data);


        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Checking if email already exists

        if (await User.findOne({ email })) {
            return res.status(400).json(new ApiError(400, "Email already Registered"));
        }

        // Creating new user
        const user: IUser = new User(data);
        await user.save();

        return res.status(200)
        .json(new ApiResponse(200, user, "User Created successfully"));;
    })



    public static login = asyncHandler(async (req: Request, res: Response): Promise<Response> => {

        const { email, password }: RequestUserLoginData = req.body;
        const data: RequestUserLoginData = { email, password };


        const { error } = Joi.object({
            email: Joi.string().required().max(250).email(),
            password: Joi.string().required(),
        }).validate(data);

        if (error)
            return res.status(400).json(new ApiError(400,"Error in login"));


        const user: IUser | null = await User.findOne({ email });

        if (user === null)
            return res.status(400).json(new ApiError(400,"User Email not register "));


        const isPasswordValid: boolean = await user.isPasswordValid(password);

        if (!isPasswordValid)
            return res.status(400).json({ success: false, message: "Wrong Password!" });

        // generating jwt token
        const token = await user.generateJwt();

        res.cookie("jwt_token", token);

        const _user = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            token:token
        };

        return res.json(new ApiResponse (400,  _user, "Login Success!" ));
    })

    // User logged out
    public static logout = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        res.clearCookie("jwt_token");
        return res.status(200).json(new ApiResponse(200, null, "User Logged out successfully"));
    })


}