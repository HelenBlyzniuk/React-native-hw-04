import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
// import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectLogin, selectUserImg } from "../../redux/auth/authSelectors";

import { logOut } from "../../redux/auth/operations";
// import { selectEmail } from "../../redux/auth/authSelectors";

export function ProfileScreen() {
  const email = useSelector(selectEmail);
  const avatar = useSelector(selectUserImg);
  const login = useSelector(selectLogin);
  console.log("email", email);
  console.log("avatar:", avatar)
  console.log("login:",login)
  const navigation = useNavigation();
  const dispatch=useDispatch();

  const handleLogout=()=>{
   dispatch(logOut());
   navigation.navigate("Registration")
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../Images/photoBG.png")}
      >
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.userInfo}>
              <View style={styles.imageContainer}>
                <Image stile={styles.avatar} source={avatar}/>
                <View style={styles.iconBtn}>
                  <TouchableOpacity>
                    <Image
                      style={styles.icon}
                      source={require("../Images/add.jpg")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.user}>
              <Text style={styles.name}>{login}</Text>
              <TouchableOpacity onPress={handleLogout}>
              <Image
                source={require("../Images/log-out.jpg")}
                style={styles.logout_icon}
              />
              </TouchableOpacity>
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.text}>Нет публикаций</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatePostsScreen")}
              >
                <Text style={styles.aside}>Создать публикацию?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingTop: 25,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
    marginTop: "30%",
    paddingBottom: 43,
    height: "80%",
  },

  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  logout_icon: {
    position: "absolute",
    left: "90%",
    top: "-320%",
  },
  image: {
    height: 812,
    width: 378,
    flex: 1,
    justifyContent: "flex-end",
  },

  icon: {
    width: 25,
    height: 25,
  },
  iconBtn: {
    position: "absolute",
    left: "90%",
    top: "65%",
  },
  imageContainer: {
    position: "absolute",
    left: "33%",
    width: 120,
    height: 120,
    // backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: "-100%",
  },
  avatar:{
    width:120,
    height:120,
    borderRadius: 16,
  },
  name: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginTop: 0,
  },
  user: {
    alignitems: "center",
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
    backgroundColor: "#FFFFFF",
  },
  post_user_footer_image: {
    height: 40,
  },
  textWrapper: {
    flex: 1,
    paddingTop: 150,
    paddingBottom: 150,
  },
  text: {
    textAlign: "center",
    color: "#212121",
    fontSize: 20,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  aside: {
    textAlign: "center",
    color: "#FF6C00",
    fontSize: 20,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    marginTop: 15,
  },
});
