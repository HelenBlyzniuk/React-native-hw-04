import { TouchableOpacity, StyleSheet } from "react-native";

import { PostsScreen } from "../PostsScreen/PostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";

import { useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons,AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


const BottomTabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,

          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        },
      })}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "#FF6C00",
          inactiveTintColor: "#212121",
        }}
        options={() => ({
          ...postsOptions,
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={styles.logOut}
            />
          ),

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="add-circle-outline"
                size={32}
                color={focused ? "#FF6C00" : "#BDBDBD"}
              />
            );
          },
        })}
      />
      <BottomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "#FF6C00",
          inactiveTintColor: "#212121",
        }}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color="#fff" 
              onPress={() => {
                navigation.navigate('Posts');
              }}
             
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                backgroundColor: '#ff6c00',
              }}
            />
          ),
          tabBarIcon: () => {
           <Ionicons
        name="add-circle-outline"
        size={32}
        color={focused ? "#FF6C00" : "#BDBDBD"}
      />
          },
        })}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "#FF6C00",
          inactiveTintColor: "#212121",
        }}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color="#fff" 
            onPress={() => {
              navigation.navigate('Posts');
            }}
           
            style={styles.arrowLeft}
          />
        ),
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                marginRight: 0,
              }}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return<Feather name="user" size={24} color="black" />;
          },
        })}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 70,
    // marginRight: 16,
    // paddingHorizontal: 16,
    // paddingVertical: 10,
  },
  btnTab: {
    alignSelf: "center",
    marginRight: 30,
    width: 40,
    height: 40,

    paddingVertical: 8,
    paddingHorizontal: 8,

    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  // btnActiveTab: {
  //   alignSelf: 'center',
  //   marginRight: 30,

  //   width: 70,
  //   height: 40,

  //   paddingVertical: 8,
  //   paddingHorizontal: 23,

  //   backgroundColor: '#ff6c00',
  //   borderRadius: 20,
  // },
});

const createPostsOptions = {
  title: "Створити публікацію",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    textAlign: "center",
  },
};

const postsOptions = {
  title: "Публікації",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    marginLeft: 120,

    textAlign: "center",
  },
};
// export function Home() {
//   const MainScreen = createStackNavigator();
//   const navigation = useNavigation();

//   function MyBackButton() {
//     const navigation = useNavigation();
//     return (
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Image source={'../Image/arrow-left.jpg'} name="arrow-back" size={24} color="#212121" />
//       </TouchableOpacity>
//     );
//   }

//     return (
// <MainScreen.Navigator>
//       <MainScreen.Screen name="Публікації" component={PostsScreen}
//       screenOptions={{
//          headerShown: false,
//         }} />
//         <MainScreen.Screen name="Createpost" component={CreatePostsScreen}
//       screenOptions={{
//          headerShown: false,
//         }} />
//         <MainScreen.Screen name="Profile" component={ProfileScreen}
//       screenOptions={{
//          headerShown: false,
//         }} />

//    </MainScreen.Navigator>

//     );
//   }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 20,
//   },
// });
