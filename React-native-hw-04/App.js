
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreenForm";

import { HomeTab } from "./screens/HomeScreen/HomeTab.js";



const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./screens/fonts/Roboto-Black.ttf"),
    RobotoRegular: require("./screens/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./screens/fonts/Roboto-Medium.ttf"),
  });

  return (
    
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerShown: false,
        }}
      >
        
        <MainStack.Screen name="Registration" component={RegistrationScreen}  screenOptions={{
          headerShown: false,
        }}/>
      
        <MainStack.Screen name="Login" component={LoginScreen}  screenOptions={{
          headerShown: false,
        }}/>
        <MainStack.Screen name="Home" component={HomeTab} screenOptions={{
          headerShown: false,
        }}/>
      </MainStack.Navigator>
     
    </NavigationContainer>
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
