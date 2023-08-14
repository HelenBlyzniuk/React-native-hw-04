

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';


import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBlkq79zMKOkGi-Fws2HfjxS27Nyo6Lmaw",
  authDomain: "react-native-app-64ba0.firebaseapp.com",
  projectId: "react-native-app-64ba0",
  storageBucket: "react-native-app-64ba0.appspot.com",
  messagingSenderId: "465849070282",
  appId: "1:465849070282:web:cf1516c8ba49b2871bfa33"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
