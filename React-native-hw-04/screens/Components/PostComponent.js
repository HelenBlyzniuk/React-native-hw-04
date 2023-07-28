import { useNavigation } from "@react-navigation/native"
import { View,Text,Image ,StyleSheet} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export const PostComponent=({name,map,img,location})=>{
   const navigation=useNavigation();
    return(
        <View style={styles.postItem}>
            <Image style={styles.img} source={{uri:img}}/>
            <Text style={styles.imgText}>{name}</Text>
            <View style={styles.decorContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate('Comments',{img})}>
                <Image source={require("../Images/Shape.jpg")} style={{width:24,height:24,color:'#BDBDBD'}}/>
                <Text style={styles.commentText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Map", {location})}}>
            <Image source={require("../Images/map-pin.jpg")}style={{width:24,height:24,color:'#BDBDBD'}}/>
                <Text style={styles.mapText}>{map}</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
postItem: {
        marginBottom: 32,
      },
img:{
    maxWidth:340,
    height:240,
    borderRadius:8,
},
imgText:{
    lineHeight:19,
    fontSize:16,
    color:' #212121',
    marginBottom:8,
    
},
decorContainer:{
    flex:1,
    justifyContent: 'space-around',
    flexDirection:'row',

},
commentText:{
    fontWeight:400,
    fontSize:16,
    color:"#BDBDBD",
},
mapText:{
    fontWeight:400,
    fontSize:16,
    color:' #212121',
},


})