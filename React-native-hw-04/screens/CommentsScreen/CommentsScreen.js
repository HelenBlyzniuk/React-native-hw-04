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


export function CommentScreen() {
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
          <View style={styles.post_page_header}>
            <Image
              source={require("../Images/arrow-left.jpg")}
              style={styles.logout_icon}
            />
            <Text style={styles.page_title}>Коментарі</Text>
          </View>


          <View style={styles.commentsContainer}>
           
          </View>


          <View style={styles.user_post_form}>
          <TouchableOpacity  style={styles.btn}> 
            <TextInput
              style={styles.user_post_input}
              placeholder="Коментувати..."
              
            //   value={comment}
            //   onChangeText={(value) => {
            //     setComment(value);
            //   }}
            //   onFocus={() => {
            //     setIsFocused(true);
            //   }}
            />
            <Image style={styles.inputIcon} source={require('../Images/Send.jpg')}/>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
  }

  const styles = StyleSheet.create({

    btn: {
        fontSize: 16,
        backgroundColor: "#E8E8E8",
        marginTop: 40,
        paddingLeft:15,
       justifyContent:'center',
        borderRadius: 100,
        width: "100%",
        height: 51,
        marginBottom: 15,
        fontFamily: "RobotoRegular",
        fontStyle: "normal",
      },
     
    page_title: {
    fontFamily: "RobotoMedium",
    fontSize:17,
    fontWeight:500,
    color: "#212121",
    textAlign:"center",
    justifyContent:'center',
    marginLeft:'28%',
  },
  logout_icon: {
   height:24,
   width:24,
  
  },
  post_page_header: {
    flex:1,
    maxHeight:50,
    flexDirection:'row',
    paddingTop:15,
    paddingBottom:15,
    borderBottomColor:"#212121",
    borderBottomWidth:1,
    
  },
  commentsContainer:{
    height:'78%',
    minWidth: 340,
  },
  inputIcon:{
    width:34,
    height:34,
    position:"absolute",
    top:7,
    right:15,
  }
  })