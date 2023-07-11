import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
// import { RegistrationScreen } from './screens/RegistrationScreen';
// import { LoginScreen } from './screens/LoginScreen/LoginScreenForm';
// import {PostsScreen} from './screens/PostsScreen/PostsScreen';
// import {CreatePostsScreen} from './screens/CreatePostsScreen/CreatePostsScreen';
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoBold': require("./screens/fonts/Roboto-Black.ttf"),
    'RobotoRegular': require("./screens/fonts/Roboto-Regular.ttf"),
    'RobotoMedium': require("./screens/fonts/Roboto-Medium.ttf"),
  });
  // const loginInfo=(info)=>{
  //   console.debug(info)
  // }

  // const registerInfo=(info)=>{
  //   console.debug(info);
  // }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <RegistrationScreen registerInfo={registerInfo}/> */}
      {/* <LoginScreen logininfo={loginInfo}/> */}
      {/* <CreatePostsScreen/> */}
      <ProfileScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
  },
});
