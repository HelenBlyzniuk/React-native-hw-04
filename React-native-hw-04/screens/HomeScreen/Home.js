import {
   TouchableOpacity,
  } from "react-native";

  import { PostsScreen } from "../PostsScreen/PostsScreen";

  import { useNavigation } from '@react-navigation/native';
  import { createStackNavigator } from "@react-navigation/stack";


export function Home() {
  const TabScreen = createStackNavigator();
  const navigation = useNavigation();

  function MyBackButton() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={'../Image/arrow-left.jpg'} name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>
    );
  }
//    const {params:{login,email,password}}=useRoute();
//   console.debug(login,email,password)
    return (
<TabScreen.Navigator>
      <TabScreen.Screen name="PostsScreen" component={PostsScreen} 
      screenOptions={{
         headerShown: false,
        }} />
      {/* <Tab.Screen name="Messages" component={Messages} /> */}
   </TabScreen.Navigator>
     
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