import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./LoginScreen/LoginScreenForm";
import { RegistrationScreen } from "./RegistrationScreen";
import { HomeTab } from "./HomeScreen/HomeTab";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectStateChange } from "../redux/auth/authSelectors";
import { stateChangeUser } from "../redux/auth/operations";

const MainStack = createStackNavigator();

export function Main() {
  const dispatch = useDispatch();
  const changeState = useSelector(selectStateChange);
  useEffect(() => dispatch(stateChangeUser()), []);
//   if (changeState === false)
//     return (
//       <NavigationContainer>
//         <MainStack.Navigator
//           initialRouteName="Registration"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <MainStack.Screen
//             name="Registration"
//             component={RegistrationScreen}
//             screenOptions={{
//               headerShown: false,
//             }}
//           />

//           <MainStack.Screen
//             name="Login"
//             component={LoginScreen}
//             screenOptions={{
//               headerShown: false,
//             }}
//           />
//           <MainStack.Screen
//             name="Home"
//             component={HomeTab}
//             screenOptions={{
//               headerShown: false,
//             }}
//           />
//         </MainStack.Navigator>
//       </NavigationContainer>
//     );
//   if (changeState === true)
//     return (
//       <NavigationContainer>
//         <MainStack.Navigator
//           initialRouteName="Home"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <MainStack.Screen
//             name="Home"
//             component={HomeTab}
//             screenOptions={{
//               headerShown: false,
//             }}
//           />
          
//         </MainStack.Navigator>
//       </NavigationContainer>
//     );
// }


return (
  <NavigationContainer>
    {!changeState ?(<MainStack.Navigator
      initialRouteName="Registration"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        screenOptions={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        screenOptions={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Home"
        component={HomeTab}
        screenOptions={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>):( <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeTab}
        screenOptions={{
          headerShown: false,
        }}
      />
       <MainStack.Screen
        name="Login"
        component={LoginScreen}
        screenOptions={{
          headerShown: false,
        }}
      />
      
    </MainStack.Navigator>)}
    
  </NavigationContainer>
);

}