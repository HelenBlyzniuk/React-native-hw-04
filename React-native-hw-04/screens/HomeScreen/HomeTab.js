import { StyleSheet } from "react-native";

import { PostsScreen } from "../PostsScreen/PostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";

import { useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

export const HomeTab = () => {
  const navigation = useNavigation();
  return (
    <BottomTabs.Navigator
      id="home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        },
        tabBarItemStyle: {
          height: 40,
          maxWidth: 70,
          borderRadius: 20,
          marginTop: 9,
          marginRight: 15,
          marginLeft: 15,
        },

        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#FFFFFF",
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
          //   headerLeft: () => (
          //   <AntDesign
          //     name="arrowleft"
          //     size={24}
          //     color="black"
          //     onPress={() => navigation.navigate("Login")}
          //     style={styles.arrowLeft}
          //   />
          // ),

          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "white" : "#212121"}
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
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          ...createPostsOptions,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("Posts");
              }}
              style={styles.arrowLeft}
            />
          ),

          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="add"
                size={24}
                color={focused ? "white" : "#212121"}
              />
            );
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
        options={({ navigation }) => ({
          ...profileOptions,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("Posts");
              }}
              style={styles.arrowLeft}
            />
          ),

          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? "white" : "#212121"}
              />
            );
          },
        })}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
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
  },
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
const profileOptions = {
  title: "Профіль",
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
