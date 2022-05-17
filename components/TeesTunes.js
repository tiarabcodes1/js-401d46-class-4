import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, SafeAreaView,StyleSheet, Button, Vibration } from 'react-native';
import { Audio } from 'expo-av';

export default function TeesTunes() {
  console.log("RENDERING SOUNDS")
  
  //Contains the state of the music for user interaction
  const [sound, setSound] = React.useState();

  async function playMusic() {
    console.log('Loading Stream');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/Ectoplasm.mp3')
    );
    setSound(sound);
    
    console.log('Playing Stream');
    await sound.playAsync(); 
  }

  //TODO: Convert to a pause function
  async function stopMusic(){
    console.log('Ending Stream')
    await sound.pauseAsync();
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
    <View style={styles.contentContainer}>
      <Ionicons name="radio" size={32} color='#FFC300' />
      <Text>Tee's Tunes</Text>
      <Button title="Play Music" onPress={playMusic} />
      <Button title="Stop Music" onPress={stopMusic} />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581845',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  }
});