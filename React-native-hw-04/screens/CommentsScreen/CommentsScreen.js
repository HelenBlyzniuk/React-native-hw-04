
import {format} from'date-fns'
import {en} from 'date-fns/locale';
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
  Alert,
} from "react-native";

import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfigs";

import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { CommentComponent } from "../Components/CommentComponent";
import { useSelector } from "react-redux";
import { selectLogin } from "../../redux/auth/authSelectors";

const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM, yyyy | HH:mm:ss", {
    locale: en,
  });
};

export function CommentsScreen({ navigation }) {
  const { params } = useRoute();
  console.log("params",params)
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const isFocused = useIsFocused();
  const userName = useSelector(selectLogin);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false,
      });
    }
  }, []);

  const handleOnPress = () => {
    // setIsFocused(false);
    Keyboard.dismiss();
  };

  const addComment = async () => {
    if (commentText.trim() === "") {
      Alert.alert("Введіть текст коментаря");
      return;
    }

    const docRef = await doc(db, "posts", params.id);
    console.log("docRef",docRef);

    await addDoc(collection(docRef, "comments"), {
      commentText,
      postedDate: formatDate(new Date()),
      userName,
    });

    handleOnPress();
    setCommentText("");
  };

  const getAllComments = async () => {

  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.post_page_container}>
        <Image style={styles.postImg} source={{ uri: params.img }} />
        <FlatList
          style={styles.commentList}
          data={comments}
          renderItem={({ item }) => (
            <CommentComponent
              authorAvatar={item.avatar}
              comment={item.comment}
              date={item.date}
            />
          )}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.user_post_form}>
            <TextInput
              style={styles.user_post_input}
              placeholder="Коментувати..."
              value={commentText}
              onChangeText={(value) => {
                setCommentText(value);
              }}
            />
            <TouchableOpacity style={styles.btn} onPress={addComment}>
              <Image
                style={styles.inputIcon}
                source={require("../Images/Send.jpg")}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  user_post_input: {
    fontSize: 16,
    backgroundColor: "#E8E8E8",
    marginTop: 0,
    padding: 15,
    justifyContent: "center",
    borderRadius: 100,
    width: "100%",
    height: 51,
    marginBottom: 15,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    position: "relative",
  },
  postImg: {
    height: 240,
    width: "100%",
    marginBottom: 28,

    backgroundColor: "#f6f6f6",

    borderRadius: 8,
  },
  commentList: {
    maxHeight: 312,
    marginBottom: 28,
  },
  page_title: {
    fontFamily: "RobotoMedium",
    fontSize: 17,
    fontWeight: 500,
    color: "#212121",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "28%",
  },
  logout_icon: {
    height: 24,
    width: 24,
  },
  post_page_container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  commentsContainer: {
    height: "78%",
    minWidth: 340,
  },
  inputIcon: {
    width: 34,
    height: 34,
    position: "absolute",
    top: 7,
    right: 15,
  },
  btn: {
    position: "absolute",
    right: 8,
    bottom: 55,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 100,
  },
});
