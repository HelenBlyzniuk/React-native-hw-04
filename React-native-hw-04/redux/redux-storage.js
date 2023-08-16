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

// const reducer = combineReducers({
//   [authSlice.name]: persistReducer(persistConfig, authSlice.reducer),
//   [postSlice.name]: postSlice.reducer,
// })

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

// const persistConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
// };

// const reducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export default { store, persistor };