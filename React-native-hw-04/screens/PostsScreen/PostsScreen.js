import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons,AntDesign } from "@expo/vector-icons";
import {MapScreen} from "../MapScreen/MapScreen.js"
import { InitialPostsScreen } from "./InitialPostsScreen.js";
import {CommentsScreen} from "../CommentsScreen/CommentsScreen.js"
import { StyleSheet } from "react-native";
const NestedStack=createStackNavigator();

export const PostsScreen=()=>{
    return(
        <NestedStack.Navigator initialRouteName="InitialPosts" screenOptions={{ headerShown: false }}>
            <NestedStack.Screen name='InitialPosts' component={InitialPostsScreen} />
         <NestedStack.Screen name='Map' component={MapScreen} screenOptions={{ headerShown: false }}/>
        <NestedStack.Screen name='Comments' component={CommentsScreen}   options={{
          ...screenOptions,
          title: 'Коментарі',
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color="black" 
              onPress={() => {
                navigation.navigate('Posts');
              }}
             
              style={styles.arrowLeft}
            />
          ),
        }}/>

        </NestedStack.Navigator>

    )
}


const styles = StyleSheet.create({
 
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },})

const screenOptions = {
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
  },
  headerTitleStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,

    textAlign: 'center',
  },
}