
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreenForm";

import { Home } from "./screens/HomeScreen/Home";



const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./screens/fonts/Roboto-Black.ttf"),
    RobotoRegular: require("./screens/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./screens/fonts/Roboto-Medium.ttf"),
  });
  // const loginInfo=(info)=>{
  //   console.debug(info)
  // }

  // const registerInfo=(info)=>{
  //   console.debug(info);
  // }
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
        <MainStack.Screen name="Home" component={Home} screenOptions={{
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
