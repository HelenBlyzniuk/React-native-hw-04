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
  Alert
} from "react-native";
import {  useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PostComponent } from "../Components/PostComponent";
import { useSelector } from "react-redux";
import { selectEmail, selectLogin, selectUserImg } from "../../redux/auth/authSelectors";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfigs";


export function InitialPostsScreen() {
  const email=useSelector(selectEmail);
  const avatar=useSelector(selectUserImg);
  const login=useSelector(selectLogin);
  
  const { params} = useRoute();
 

  const [posts, setPosts] = useState([ ]);
  const [commentNumber, setCommentNumber]=useState(0)
  const [isKeyFocused, setIsKeyFocused] = useState(false);
  const isFocused=useIsFocused();
  const navigation=useNavigation();


  const getPosts=async()=>{
    try {
      await onSnapshot(collection(db,"posts"),(data) => {
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setPosts(posts)
        console.log(posts)
      })
        
    } catch (error) {
      console.log(error.massage);
      Alert.alert("Try again");
    }
  }

  useEffect(()=>{getPosts()},[]);


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
            <Image source={{uri:avatar}}/>
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
                img={item.photo}
                location={item.location}
                id={item.id}
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
