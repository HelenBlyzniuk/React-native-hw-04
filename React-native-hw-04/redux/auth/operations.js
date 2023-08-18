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
        console.log("user", user)
        
        await updateProfile(user,{
          displayName: login,
          photoURL: photo,
        });
        // console.log("user", user)

        const {uid,displayName,photoURL,email:emailBase}= auth.currentUser;
        console.log(uid)
        const userProfile={
          login:displayName,
          email:emailBase,
          avatar:photoURL,
          userId:uid,
        }
        console.log(user.profile)
       
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

// export const updateUser =
//   ({ avatarURL }) =>
//   async (dispatch, state) => {
//     try {
//       const user = auth.currentUser;

//       await updateProfile(user, {
//         avatar: avatarURL,
//       });

//       const {
//         uid,
//         displayName,
//         email: emailBase,
//         avatar: photoUrl,
//       } = auth.currentUser;

//       const userProfile = {
//         userId: uid,
//         login: displayName,
//         email: emailBase,
//         avatar: photoUrlBase,
//       };
//       dispatch(createUserProfile(userProfile));
//     } catch (error) {
//       return error.code;
//     }
//   };

export const stateChangeUser = () => async (dispatch, state) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(createUserProfile(userProfile));
    }
  });
};

export const logOut = () => async (dispatch, state) => {
  await signOut(auth);
  dispatch(authLogOut());
};
