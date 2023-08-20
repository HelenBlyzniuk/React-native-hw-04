import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MapScreen } from "../MapScreen/MapScreen.js";
import { InitialPostsScreen } from "./InitialPostsScreen.js";
import { CommentsScreen } from "../CommentsScreen/CommentsScreen.js";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
const NestedStack = createStackNavigator();

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logOut());
    navigation.navigate("Login");
  };
  return (
    <NestedStack.Navigator
      initialRouteName="InitialPosts"
      screenOptions={{ headerShown: true }}
    >
      <NestedStack.Screen
        name="InitialPosts"
        component={InitialPostsScreen}
        options={{
          ...screenOptions,
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={styles.arrowLeft}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...screenOptions,
          title: "Карти",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.navigate("InitialPosts")}
              style={styles.arrowLeft}
            />
          ),
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...screenOptions,
          title: "Коментарі",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.navigate("InitialPosts")}
              style={styles.arrowLeft}
            />
          ),
        }}
      />
    </NestedStack.Navigator>
  );
};

const styles = StyleSheet.create({
  arrowLeft: {
    // marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

const screenOptions = {
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 30,
    textAlign: "center",
  },
};
