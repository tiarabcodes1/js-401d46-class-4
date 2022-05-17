import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, SafeAreaView,StyleSheet, Button, Vibration,TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import tunes from '../assets/music-data/data'
import { useFonts } from 'expo-font';

export default function TeesTunes() {
  console.log("RENDERING SOUNDS")
  
  //Contains the state of the music for user interaction
  const [sound, setSound] = React.useState();
  const [show, setShow] = React.useState(false);

  async function playMusic() {
    console.log('Loading Stream');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/Ectoplasm.mp3'),
       );
    setShow(true)
    setSound(sound);
    
    console.log('Playing Stream');
    await sound.playAsync(); 
  }

  //TODO: Convert to a pause function
  async function stopMusic(){
    console.log('Ending Stream')
    await sound.pauseAsync();
    setShow(false)
  }

  //TODO: Create function to allow vibration upon button click
  //TODO: Create background play functionality

  // React. accesses the global scope of react to access useEffect
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.titleContainer}>
      <Ionicons name="radio" size={32} color='#FFC300' />
      <Text style={{ fontFamily: 'Montserrat', fontSize: 30, color: '#fff' }}>Tee's Tunes</Text>
    </View>
    <View style={styles.contentContainer}>

      <TouchableOpacity onPress={playMusic}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Play Music</Text>
      </TouchableOpacity>

      { show == true ?
        <Text style={{fontSize: 10, color: '#FFC300'}}> You are Jamming to {tunes.data.title}</Text>
      : null}

      <TouchableOpacity onPress={stopMusic}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Stop Music</Text>
      </TouchableOpacity>
    </View>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#581845',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingTop: 300,
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  }
});