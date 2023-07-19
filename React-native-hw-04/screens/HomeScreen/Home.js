import { createStackNavigator } from "@react-navigation/stack";


import { HomeTab } from "./HomeTab.js";
import {MapScreen} from "../MapScreen/MapScreen.js"
import {CommentsScreen} from "../CommentsScreen/CommentsScreen.js"


const NestedStack=createStackNavigator();
export const Home=()=>{

   
    return(
        <NestedStack.Navigator>
    <NestedStack.Screen name='Home' component={HomeTab} options={{
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