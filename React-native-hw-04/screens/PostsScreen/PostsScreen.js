import { createStackNavigator } from "@react-navigation/stack";
import {MapScreen} from "../MapScreen/MapScreen.js"
import { InitialPostsScreen } from "./InitialPostsScreen.js";
import {CommentsScreen} from "../CommentsScreen/CommentsScreen.js"

const NestedStack=createStackNavigator();

export const PostsScreen=()=>{
    return(
        <NestedStack.Navigator initialRouteName="InitialPosts" screenOptions={{ headerShown: false }}>
            <NestedStack.Screen name='InitialPosts' component={InitialPostsScreen} options={{
          headerShown: false,
        }}/>
         <NestedStack.Screen name='Map' component={MapScreen}options={{
          headerShown: false,
        }}/>
        <NestedStack.Screen name='Comments' component={CommentsScreen} options={{
          headerShown: false,
        }}/>

        </NestedStack.Navigator>

    )
}