import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {  useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PostComponent } from "../Components/PostComponent";
import { useSelector } from "react-redux";
import { selectEmail, selectLogin, selectUserImg } from "../../redux/auth/authSelectors";


export function InitialPostsScreen() {
  const email=useSelector(selectEmail);
  const avatar=useSelector(selectUserImg);
  const login=useSelector(selectLogin);
  console.log("email:",email)
  const { params} = useRoute();
  console.log(params)

  const [posts, setPosts] = useState([ {img: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540lenablyzniuk%252FReact-native-hw-04/Camera/e52a6693-95b2-4083-9697-12c44fecb0c0.jpg",
   location: {latitude: 37.4220936, longitude: -122.083922},map: "Ukraine", postName: "Forest"}]);
  const [isKeyFocused, setIsKeyFocused] = useState(false);
  const isFocused=useIsFocused();
  const navigation=useNavigation();

  useEffect(() => {
    if (!params) {
      return;
    }
    const newPost=params.params;
    console.log("params in useEfeect",params.params)
    setPosts((prev) => [...prev, newPost]);
  }, [params]);
  
  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
       
        headerShown: false,
      });
    }
  }, []);

  
  const handleOnPress = () => {
    setIsKeyFocused(false);
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
            <Image source={avatar}/>
            <View style={styles.post_user_info}>
              <Text style={styles.post_user_name}>{login}</Text>
              <Text style={styles.post_user_email}>{email}</Text>
            </View>
          </View>
         
          <FlatList
            style={styles.post_user_content}
            data={posts}
            renderItem={({ item }) => (
              <PostComponent
                name={item.postName}
                map={item.map}
                img={item.img}
                location={item.location}
              />
            )}
          />
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
    minWidth: "100%",
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
    // flex: 1,
    flexDirection: "row",
    marginTop: 0,
    gap: 10,
    paddingTop: 30,
    // justifyContent: "flex-start",
    minWidth: 340,
  },
  post_user_photo: {
    height: 60,
    width: 60,
    borderColor: "#212121",
    // backgroundColor: "#FF6C00",
    borderRadius: 25,
    borderWidth:1,
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
    marginTop:20,
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
