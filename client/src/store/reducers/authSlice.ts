import { createSlice } from "@reduxjs/toolkit";

const inittialState={
    isLoggedIn:false,
    user:null,
    token:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState:inittialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.user=null;
            state.token=null;
        }
    }
})

export const {login,logout}=authSlice.actions;

export default authSlice.reducer;