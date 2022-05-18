import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';


export default function CameraScreen({  }) {
  console.log("App Executed")
 
  
  // async function getUserSmile () {
  //   const res = await ImagePicker.getCameraPermissionsAsync();
  //   if (res.granted) {
  //     console.log(music)
  //     let music = await MediaLibrary.getAssetsAsync({
  //       mediaType: 'image'
  //     })
  //     .then((albums) => console.log(albums))
  //     .catch((err) => console.warn(err))
  //   }
  // }

  return (
    <View style={styles.container}>
      <Text>This is the camera screen</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581890',
    alignItems: 'center',
    justifyContent: 'center',
  },
});