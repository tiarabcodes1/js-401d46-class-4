import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import ColorModeContext from '../assets/config/ColorModeContext';


export default function LikePage({ route }) {
  const colorMode = React.useContext(ColorModeContext);

  const { songInfo, artistName} = route.params;

  return (
    <View style={[styles.container, {backgroundColor: colorMode.background}]}>
      <Text style={[ {fontSize: 20},{color: colorMode.color},{backgroundColor: colorMode.background}]}>Your Likes: </Text>
      {
       songInfo ? 
      <Text style={[ {fontSize: 20},{color: colorMode.color},{backgroundColor: colorMode.background}]}>{JSON.stringify(songInfo)} by {JSON.stringify(artistName)}</Text>
      : <Text style={[ {fontSize: 20},{color: colorMode.color},{backgroundColor: colorMode.background}]}>Go like some songs!</Text>}
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