import {
  Text,
  View,
  StyleSheet,
    TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  
} from "react-native";

import { useState } from "react";

export function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [map, setMap] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleOnPress = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.post_page_container}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* <View style={styles.post_page_header}>
            <Image
              source={require("../Images/arrow-left.jpg")}
              style={styles.logout_icon}
            />
            <Text style={styles.page_title}>Створити публікацію</Text>
          </View> */}


          <View style={styles.post_user_container}>
           
            <View style={styles.post_user_post} >
            
            <View style={styles.post_user_info}>
              <Image
                style={styles.camera}
                source={require("../Images/camera.jpg")}
              /> 
            </View>
            <Text style={styles.post_user_notification}>Завантажте фото</Text>
            </View>
           
            

          

          <View style={styles.user_post_form}>
            <TextInput
              style={styles.user_post_input}
              placeholder="Назва..."
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
            />
            <TextInput
              style={styles.user_post_input_place}
              placeholder="Місцевість..."
             
              value={map}
              onChangeText={(value) => {
                setMap(value);
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
            />
              <Image
                style={{...styles.map,top:isFocused?"42%":"20%"}}
                source={require("../Images/map-pin.jpg")}
              />
           <TouchableOpacity  style={styles.btn}>
           <Text style={styles.btn_sign_text}>Опубліковати</Text>
           </TouchableOpacity>
          </View>
          </View>

          <View style={{...styles.post_user_footer,bottom:isFocused?-70:0}}>
            <Image
              style={styles.post_user_footer_image}
              source={require("../Images/trash.jpg")}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}


const styles = StyleSheet.create({
  post_page_container: {
    flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
  },
  page_title: {
    fontFamily: "RobotoMedium",
    fontSize: 17,
    fontWeight: 500,
    color: "#212121",
    textAlign: "center",
    marginLeft: "15%",
  },
  logout_icon: {
    height: 24,
    width: 24,
  },
  post_page_header: {
    flex: 1,
    maxHeight: 50,
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: "#212121",
    borderBottomWidth: 1,
  },
  post_user_container: {
    flex: 1,
    margin: 0,
    paddingTop: 30,
  },

  post_user_info: {
    height: 240,
    minWidth: 340,
    // width: "100%",
    borderColor: "#212121",
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    
  },

  camera: {
    width: 40,
    height: 40,
    position: "absolute",
    left: "44%",
    top: "44%",
    borderRadius:100,
  },
  post_user_notification: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    fontWeight: 500,
    color: "#212121",
    marginTop:10,
    marginBottom:20,
  },
  user_post_form:{
    flex:1,
   margin:0,
   

  },
  user_post_input:{
    height:50,
    borderBottomColor: "#212121",
    borderBottomWidth: 1,
    marginBottom:15,
    
  },
  user_post_input_place:{
    height:50,
    borderBottomColor: "#212121",
    borderBottomWidth: 1,
    marginBottom:15,
   paddingLeft:35,
    
  },
 
map:{
    position:'absolute',
    // top:'20%',
},

  post_user_footer: {
    flex: 1,
    justifyContent: "center",
    height: 83,
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    gap: 20,
    position: "absolute",
    // bottom: 0,
  },
  post_user_footer_image: {
    height: 40,
  },
  btn: {
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    color: "#FFFFFF",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: "100%",
    height: 51,
    marginBottom: 15,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  btn_sign_text: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
});
