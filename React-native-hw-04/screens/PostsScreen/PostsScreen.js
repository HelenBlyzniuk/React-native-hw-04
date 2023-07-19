import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// import { useState } from "react";

export function PostsScreen() {
  const navigation = useNavigation();
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
          

          <View style={styles.post_user_container}>
            <View style={styles.post_user_photo} />
            <View style={styles.post_user_info}>
              <Text style={styles.post_user_name}>User name</Text>
              <Text style={styles.post_user_email}>Email</Text>
            </View>
          </View>
          <View style={styles.post_user_content}></View>
          
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  post_page_container: {
    padding: 16,
    flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      minWidth:"100%",
  },
  page_title: {
    fontFamily: "RobotoMedium",
    fontSize: 17,
    fontWeight: 500,
    color: "#212121",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "35%",
  },
  logout_icon: {
    height: 24,
    width: 24,
    marginRight: 14,
    marginLeft: 114,
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
    flexDirection: "row",
    margin: 0,
    gap: 10,
    paddingTop: 30,
    justifyContent:'flex-start',
    minWidth:340,
  },
  post_user_photo: {
    height: 60,
    width: 60,
    borderColor: "#212121",
    backgroundColor: "#FF6C00",
    borderRadius: 25,
  },
  post_user_info: {
    textAlign: "center",
    paddingTop: 7,
  },
  post_user_name: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    fontWeight: 500,
    color: "#212121",
  },
  post_user_email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    fontStyle: "normal",
    color: "#212121",
  },
  post_user_content: {
    flex: 1,
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
    bottom: 0,
  },
  post_user_footer_image: {
    height: 40,
  },
});
