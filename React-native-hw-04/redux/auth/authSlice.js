import { createSlice } from '@reduxjs/toolkit';


const authInitialState={
    email:null,
    login:null,
    userImg:null,
    userId:null,
    comments:null,

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
        addComment: (state, { payload }) => ({
            comment: payload,
          }),
    }
})

export const {createUserProfile,authLogOut,addComment}=authSlice.actions;
export const authReducer=authSlice.reducer;