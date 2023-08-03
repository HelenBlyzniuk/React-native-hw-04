import { createSlice } from '@reduxjs/toolkit';


const authInitialState={
    email:null,
    login:null,
    userImg:null,
    userId:null,

}

export const authSlice=createSlice({
    name:'auth',
    initialState:authInitialState,
    reducers:{
        createUserProfile:(state,{payload})=>({
            ...state,
            login:payload.login,
            email:payload.email,
            userImg:payload.img,
            userId:payload.id,
        }),
        authLogOut:()=>(authInitialState),
    }
})

export const {createUserProfile,authLogOut}=authSlice.actions;
export const authReducer=authSlice.reducer;