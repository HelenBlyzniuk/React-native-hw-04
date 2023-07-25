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
  ImageBackground,
  
} from "react-native";
import {Camera} from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import { useState,useEffect} from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// import * as DocumentPicker from 'expo-document-picker';

export function CreatePostsScreen() {


  const navigation =useNavigation()
  const [name, setName] = useState("");
  const [map, setMap] = useState("");
  const [img,setImg]=useState('');
  const [isFocused, setIsFocused] = useState(false);
  //Camera
  const[activeCamera,setActiveCamera]=useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type,setType]=useState(Camera.Constants.Type.back)
 
  const [location,setLocation]=useState(null);
  

  useEffect(() => {
    setLocation(null);
    setImg(null);
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addLocation=async()=>{
    let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      
  }


  const handleOnPress = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleImageLoad=async()=>{
  // const img=await DocumentPicker.getDocumentAsync({
  //   type:'image/*'
  // })
  // if(img.type==='cancel'){
  //   return setImg(null)
  // }
  // setImg(img)
  if (cameraRef) {
    try {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      console.debug(uri)
      setImg(uri);
      console.log(img)
      setActiveCamera(false)
    } catch (error) {
      console.log('Error > ', error.message);
    }
  }

  // addLocation();
  }

  const onPostSubmit=()=>{
    if(!name||!map||!img){
      return console.warn('Завантажте фото та заповніть поля')
    }
    const post={name,map,img,location}
    navigation.navigate('Posts',{params:{post}})
    setName('');
    setMap('');
    setImg(null);

  }

  const disabled=()=>{
    return (<View><Text>Завантажте фото та заповніть поля</Text></View>)
  }
  const onTrashIconPress=()=>{
    setName('');
    setMap('');
    setImg(null)
  }

 
  return (
    <View style={styles.post_page_container}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
         {activeCamera&&(   <View style={styles.container}>
     <Camera
        style={styles.camera}
        type={type}
        ref={setCameraRef}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleImageLoad
            //   async () => {
            //   if (cameraRef) {
            //     const data = await cameraRef.takePictureAsync();
            //     setImg(data.uri)
            //     await MediaLibrary.createAssetAsync(data.uri);
            //     console.log(uri)
            //   }
            // }
          }
          >
            
          </TouchableOpacity>
        </View>
      </Camera>
    </View>)}
 

         <View style={styles.post_user_container}>
           
            <View style={styles.post_user_post} >
            {img?(<ImageBackground style={styles.post_user_info} source={img}/>): (<View style={styles.post_user_info}>
              
              <TouchableOpacity style={styles.cameraImg} onPress={()=>{setActiveCamera(true)}}>
              <Image
                style={styles.cameraImg}
                source={require("../Images/camera.jpg")}
              /> 
              </TouchableOpacity>
              
            </View>) }
            
           
            <Text style={styles.post_user_notification}>{img?'Редагувати фото':'Завантажте фото'}</Text>
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
                style={{...styles.map,top:isFocused?"42%":"25%"}}
                source={require("../Images/map-pin.jpg")}
              />
           <TouchableOpacity  style={{
            ...styles.btn,
            backgroundColor: !name || !map ||!img? '#f6f6f6' : '#ff6c00',
          }} onPress={ !name || !map ||!img?disabled:onPostSubmit}
          >
           <Text style={{...styles.btn_sign_text, color:!name||!location||!img?'#BDBDBD':'#fff'}}>Опубліковати</Text>
           </TouchableOpacity>
          </View>
          </View>
          {/* )} */}

          <View style={{...styles.post_user_footer}}>
            <TouchableOpacity onPress={onTrashIconPress}>
            <Image
              style={styles.post_user_footer_image}
              source={require("../Images/trash.jpg")}
            />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}


const styles = StyleSheet.create({
 
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",

  },

  // flipContainer: {
  //   flex: 0.1,
  //   alignSelf: "center",
  // },

  button: { alignSelf: "center",width:40,height:40,borderRadius:100,backgroundColor:'#ffffff',marginBottom:250, },

  // takePhotoOut: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 50,
  //   width: 50,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 50,
  // },

  // takePhotoInner: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 40,
  //   width: 40,
  //   backgroundColor: "white",
  //   borderRadius: 50,
  // },
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

  cameraImg: {
    width: 40,
    height: 40,
    position: "absolute",
    left: "40%",
    top: "37%",
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
    // justifyContent: "center",
    height: 83,
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    gap: 20,
    position: "absolute",
    bottom:-20,
    marginLeft:"35%",
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
    // color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
  },
  camera:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
});
