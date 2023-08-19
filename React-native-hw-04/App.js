
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import { Main } from "./screens/Main";

import {store,persistor} from './redux/redux-storage.js';
import { PersistGate } from 'redux-persist/integration/react';
import {Text} from 'react-native';
import { useCallback } from "react";


const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./screens/fonts/Roboto-Black.ttf"),
    RobotoRegular: require("./screens/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./screens/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView=useCallback(async()=>{
    if(!fontsLoaded)
    await SplashScreen.hideAsync()
  },[fontsLoaded])

  if(!fontsLoaded){
    return null
  }

  return (
    <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
   <Main/>
    </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 20,
//   },
// });
