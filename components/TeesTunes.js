import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, SafeAreaView, Button, Alert, Vibration, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import tunes from '../assets/music-data/data'
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import useSpotifyAPI from '../hooks/useSpotifyAPI'
import * as MediaLibrary from 'expo-media-library';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TeesTunes() {
  console.log("RENDERING SOUNDS")

  let response = useSpotifyAPI();
  console.log("SHOW", response)

  const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

  //Contains the state of the music for user interaction
  const [sound, setSound] = React.useState();
  const [showContent, setShow] = React.useState(false);
  // const [status, requestPermission] = React.useState(null);

  async function playMusic() {
    console.log('Loading Stream');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Ectoplasm.mp3'),
      );
      setSound(sound);
      
      console.log('Playing Stream');
      await sound.playAsync();
      setShow(true)
  }

  //TODO: Convert to a pause function
  async function stopMusic() {
    console.log('Ending Stream')
    await sound.pauseAsync();
    setShow(false)
  }

  async function getUserSmile () {
    const res = await ImagePicker.getCameraPermissionsAsync();
    if (res.granted) {
      console.log(music)
      let music = await MediaLibrary.getAssetsAsync({
        mediaType: 'image'
      })
      .then((albums) => console.log(albums))
      .catch((err) => console.warn(err))
    }
  }

  //TODO: Create function to allow vibration upon button click
  const handleLikeAlert = (songTitle) => {
    //.alert() takes title, message, buttons options, etc
    Alert.alert(
      "You must really like this tune!",
      "This has been added to your saved songs",
      [
        {
          text: `${songTitle}`,
          onPress: () => Alert.alert("Song Liked"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        //(property)Callback function fired when alert has been dismissed.
        onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),

      }
    );
    Vibration.vibrate()
  };

  //TODO: Create background play functionality

  // React. accesses the global scope of react to access useEffect
  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };

  return (


        <SafeAreaView >
          <View >
            <Ionicons name="radio" size={50} color='#FFC300' />
            <Text style={{  fontSize: 50, color: '#fff' }}>Tee's Tunes</Text>
          </View>
          <View >

            <TouchableOpacity onPress={playMusic}>
              <Text style={{ fontSize: 30, color: '#FFC300' }}>Play Music</Text>
            </TouchableOpacity>

            {showContent == true ?
              <Text style={{ fontSize: 10, color: '#fff' }}> You are Jamming to {tunes.data.title}</Text>
              : null}
            {/* onPress handles user tap on content */}
            <TouchableOpacity onPress={stopMusic}>
              <Text style={{ fontSize: 30, color: '#FFC300' }}>Stop Music</Text>
            </TouchableOpacity>
          </View>
            <View >
            <FontAwesome.Button name="heart" onPress={() => handleLikeAlert(tunes.data.title)} />
            {showContent == false ?
              <Text style={{ fontSize: 10, color: '#fff' }} >Compare how happy you are before and after playing this song!</Text>
              : null}
              
            <FontAwesome.Button name="camera" onPress={getUserSmile} />
            </View>
          <View />
        </SafeAreaView>


  )
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 100,
//     flex: 1,
//     backgroundColor: '#581845',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleContainer: {
//     paddingTop: 300,
//     flex: 1,
//     alignItems: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     fontWeight: 'bold',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });