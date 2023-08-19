import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
 
} from "firebase/auth";


import { auth } from "../../firebase/firebaseConfigs";
import { createUserProfile, authLogOut, authStateChange } from "./authSlice";

export const registerDB =  ({ login, email, password, photo }) => 
  async (dispatch, state) => {
    try {
        const data=await createUserWithEmailAndPassword(auth, email, password);
        
        const user= auth.currentUser;
       
        
        await updateProfile(user,{
          displayName: login,
          photoURL: photo,
        });
        

        const {uid,displayName,photoURL,email:emailBase}= auth.currentUser;
        console.log(uid)
        const userProfile={
          login:displayName,
          email:emailBase,
          avatar:photoURL,
          userId:uid,
        }
        
       
        dispatch(createUserProfile(userProfile));
     
    } catch (error) {
     console.log(error.message)
     alert("sign up failed");
    }
  };


export const loginUser =
  ({ email, password }) =>
  async (dispatch, state) => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      console.log("credentials:",credentials)
      
    } catch (error) {
      return error.code;
    }
  };


export const stateChangeUser = () => async (dispatch, state) => {
  let userProfile = {};
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
    }
  });
  dispatch(authStateChange({ stateChange: true }));
  dispatch(createUserProfile(userProfile));
};


export const logOut = () => async (dispatch, state) => {
  await signOut(auth);
  dispatch(authLogOut());
};
