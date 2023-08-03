import { configureStore,CombineReducers } from '@reduxjs/toolkit';
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
import rootReducer from './rootReducer';
import { authSlice } from './auth/authSlice';
import { postSlice } from './posts/postSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['accessToken'],
};

const rootReducer = CombineReducers({
    [authSlice.name]:persistReducer(persistConfig(authSlice.reducer)),
    [postSlice.name]:postSlice.reducer,
})


const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };