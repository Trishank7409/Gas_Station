import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcrypt";
import Jwt from 'jsonwebtoken';


// Interface
export interface IUser extends Document {
    fullName: string;
    email: string;
    role: "Admin" | "User"; // 1 for Admin  and 2 User
    password: string;
    isPasswordValid(password: string): Promise<boolean>;
    generateJwt(): Promise<string>;
}


const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "Admin" },
    password: { type: String, required: true },
});


// Observers
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


userSchema.methods.isPasswordValid = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwt = async function (): Promise<string> {
    const secret: string = process.env.JWT_SECRET || "jwtsecret@123";
    return await Jwt.sign({ email: this.email }, secret);
};



export default model<IUser>('User', userSchema);