
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: '606cb0045cb7a535b4947e0814505a56d37417e1',
    authDomain: 'react-native-57242.firebaseapp.com',
    databaseURL: 'https://react-native-57242.firebaseio.com',
    projectId: 'react-native-57242',
    storageBucket: 'react-native-57242.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
  };
  

  сonst app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);