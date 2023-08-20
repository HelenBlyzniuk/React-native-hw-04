import { configureStore,combineReducers } from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { authReducer } from './auth/authSlice';
import { postReducer } from './auth/postSlice';





const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
 
};
const reducer = combineReducers({
  users: authReducer,
  posts: postReducer,
})

const persistedReducer=persistReducer(persistConfig,reducer)


export const store = configureStore({
  reducer:persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


