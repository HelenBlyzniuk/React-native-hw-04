import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreenForm";
// import { PostsScreen } from "./screens/PostsScreen/PostsScreen";
import { Home } from "./screens/HomeScreen/Home";

// import {CreatePostsScreen} from './screens/CreatePostsScreen/CreatePostsScreen';
// import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';
// import { CommentScreen } from './screens/CommentsScreen/CommentsScreen';

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
      {/* <View style={styles.container}>
      <StatusBar style="auto" /> */}
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Аналог Routes */}
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        {/* Аналог Route */}
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
      {/* <RegistrationScreen registerInfo={registerInfo}/> */}
      {/* <LoginScreen logininfo={loginInfo}/> */}
      {/* <CreatePostsScreen/> */}
      {/* <ProfileScreen/> */}
      {/* <CommentScreen/> */}
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
