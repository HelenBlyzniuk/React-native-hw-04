import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";

export function LoginScreen() {

  const navigation = useNavigation();
  const dispatch=useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnPress = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Заповніть всі поля!!!");
    }


    
    dispatch(loginUser(email,password))
    navigation.navigate('Home',{email,password})
    
    setEmail("");
    setPassword("");
   
  };

  return (
    <View  style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../Images/photoBG.png")}
      >
        <TouchableWithoutFeedback onPress={handleOnPress}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ ...styles.form }}>
              <Text style={styles.title}>Увійти</Text>

              <TextInput
                style={styles.input}
                type="email"
                placeholder="Адреса електронної пошти"
                value={email}
                keyboardType="email-address"
                onChangeText={(value) => {
                  setEmail(value);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                secureTextEntry
                onChangeText={(value) => {
                  setPassword(value);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
              />
              <View
                style={{
                  ...styles.btnContainer,
                  marginBottom: isFocused ? 0 : 143,
                }}
              >
                <TouchableOpacity
                  style={styles.btn_sign}
                  onPress={handleSubmit}
                  
                >
                  <Text style={styles.btn_sign_text}>Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.sentence}>
                  Немає акаунту? Зареєструватися
                </Text>
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
      },
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    color: "#212121",
    marginTop: 32,
    marginBottom: 30,
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
  btnContainer: {
    marginBottom: 143,
    width: "100%",
    alignItems: "center",
  },
  form: {
    padding: 16,
    marginTop: "85%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  image: {
    height: 812,
    width: 375,

    flex: 1,
    justifyContent: "flex-end",
  },
  btn_sign_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
});
