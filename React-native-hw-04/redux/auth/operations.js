import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

// import { auth } from "../../firebase/firebaseConfigs";
import { createUserProfile, authLogOut, authStateChange } from "./authSlice";
import { auth } from "../../firebase/firebaseConfigs";

export const registerDB = async ({ login, email, password, avatar }) => {
  async (dispatch, state) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
        avatar: avatar,
      });
      const {
        uid,
        displayName,
        email: emailBase,
        avatar: photoUrlBase,
      } = auth.currentUser;
      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        avatar: photoUrlBase,
      };
      dispatch(createUserProfile(userProfile));
    } catch (error) {
      return error.code;
    }
  };
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch, state) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
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
//         avatar: photoUrlBase,
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
