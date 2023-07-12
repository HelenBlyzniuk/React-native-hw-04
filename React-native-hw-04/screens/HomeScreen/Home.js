import {
    View,
  } from "react-native";

  import { PostsScreen } from "../PostsScreen/PostsScreen";

//   import { useRoute } from '@react-navigation/native';



export function Home() {
//    const {params:{login,email,password}}=useRoute();
//   console.debug(login,email,password)
    return (

      <View style={styles.container}>
       <PostsScreen/>
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
  });