export interface RequestUserSignupData {
    fullName: string,
    email: string,
    role: "Admin" | "User",
    password: string,
    confirmPassword: string
}
export interface RequestUserLoginData {
    email: string,
    password: string
}
// station interface
export interface Station {
    name: String,
    lat: Number,
    lng: Number
    address: String
    city: String
    state: String
    Gas_Price: Number
    status: Boolean
    created_by?: String
}
