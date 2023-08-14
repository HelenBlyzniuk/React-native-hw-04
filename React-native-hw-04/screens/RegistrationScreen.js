import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
// import {getAuth} from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { registerDB,authStateChange } from "../redux/auth/operations";
import { auth,storage } from "../firebase/firebaseConfigs";
import { createUserWithEmailAndPassword ,updateProfile,getDownloadURL} from "firebase/auth";



export function RegistrationScreen() {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  

  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [shouldShow, setShouldShow] = useState(false);

  const handleSubmit = async () => {
    if (email.trim() === "" || password.trim() === "" || login.trim() === "") {
      Alert.alert("Заповніть всі поля!!!");
    }

    const photo = avatar
      ? await uploadImageToServer()
      : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png";
   
      try {
        const data=await createUserWithEmailAndPassword(auth, email, password);
        console.log(data)
        const user=auth.currentUser;
        console.log("user", user)
      //   await updateProfile(user, {
      //   displayName: login,
      //   avatar: avatar,
      // });
      } catch (error) {
        console.log(error) ;
        alert("sign up failed");
      }
   

    // dispatch(registerDB(login, email, password, avatar)).then((data) => {
    //   console.log(data)
    //   if (data === undefined || !data.uid) {
    //     alert(`Реєстрацію не виконано!`);
    //     return;
    //   }

    //   dispatch(authStateChange({ stateChange: true }));
    // });


    // navigation.navigate("Home", { login, email, password, avatar });
    // setLogin("");
    // setEmail("");
    // setPassword("");
  };

  const onLoadAvatar = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.assets.length>0) {
      setAvatar(result.assets[0]);
    }
  };

  const uploadImageToServer = async () => {
   

    if (avatar) {
      try {
        const response = await fetch(avatar.uri);

        const file = await response.blob();
        const uniquePostId=Date.now().toString()
        const imageRef = await ref(
          storage,
          `profileAvatar/${uniquePostId}/${file.data.name}`
        );

        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
      } catch (error) {
        console.warn("uploadImageToServer: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./Images/photoBG.png")}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setIsFocused(false);
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.formWrapper}>
              <View
                style={{ ...styles.form, paddingBottom: isFocused ? 12 : 45 }}
              >
                <View
                  style={{
                    ...styles.imageContainer,
                    top: isFocused ? "-5%" : "-15%",
                  }}
                >
                  {avatar && <Image style={styles.avatar} source={avatar} />}
                  <View style={styles.iconBtn}>
                    <TouchableOpacity onPress={onLoadAvatar}>
                      {!avatar ? (
                        <Image
                          style={styles.icon}
                          source={require("./Images/add.jpg")}
                        />
                      ) : (
                        <Image
                          style={styles.icon}
                          source={require("./Images/delete.jpg")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  value={login}
                  textContentType="nickname"
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  onChangeText={(value) => {
                    setLogin(value);
                  }}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  value={email}
                  textContentType="emailAddress"
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  onChangeText={(value) => {
                    setEmail(value);
                  }}
                />

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    textContentType="password"
                    secureTextEntry={shouldShow}
                    onFocus={() => {
                      setIsFocused(true);
                    }}
                    onChangeText={(value) => {
                      setPassword(value);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={() => {
                      setShouldShow(!shouldShow);
                    }}
                  >
                    <Text style={styles.showPassword_text}>
                      {shouldShow ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.btn_sign}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btn_sign_text}>Зареєстуватися</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.sentence}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    color: "#212121",
    marginTop: 89,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    paddingLeft: 13,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 6,
    marginBottom: 15,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  formWrapper: {
    // paddingTop: 65,
    paddingTop: 25,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
    marginTop: "30%",
    paddingBottom: 43,
  },
  btn_sign: {
    fontSize: 16,
    backgroundColor: "#FF6C00",
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
  sentence: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  showPassword_text: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  showPassword: {
    position: "absolute",
    top: 13,
    right: 13,
  },
  image: {
    height: 812,
    width: 378,
    flex: 1,
    justifyContent: "flex-end",
  },
  btn_sign_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
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
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
  },
});
