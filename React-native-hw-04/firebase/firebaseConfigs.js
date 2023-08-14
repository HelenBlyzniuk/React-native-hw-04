

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import 'firebase/compat/auth';
 
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVZLg8BSLSvv3BXlgKuAjPnLioR3iXzVw",
  authDomain: "react-native-57242.firebaseapp.com",
  projectId: "react-native-57242",
  storageBucket: "react-native-57242.appspot.com",
  messagingSenderId: "147926370865",
  appId: "1:147926370865:web:2a89b17107b9c2e0502310",
  measurementId: "G-Y5VJS4T4R7"
};


export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const myStorage = getStorage(app);