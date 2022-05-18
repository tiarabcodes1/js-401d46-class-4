import { StatusBar } from 'expo-status-bar';
import ColorModeContext from './assets/config/ColorModeContext.js'
import ColorMode from './assets/config/ColorMode.js';
import * as React from 'react';
import { StyleSheet, View, Center } from 'react-native';
import TeesTunes from './components/TeesTunes';
import LikePage from './components/LikePage';
import { EventRegister } from 'react-native-event-listeners';
//Contains navigation state and manages history
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  console.log("App Executed")

  const Stack = createNativeStackNavigator();
  //Updates on toggle change
  const [mode, setMode] =React.useState(false)

  //Subscribes to those changes globally 
    React.useEffect(() => {
      let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
        //State of switch from TeesTunes
        setMode(data)
        console.log(data)
      });
      return () => {
        //no longer accessing that state.
        EventRegister.removeEventListener(eventListener)
      }
    })
  return (
    // all components can access the theme (context)
    <ColorModeContext.Provider value={mode === true ? ColorMode.dark : ColorMode.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
    {/* <View style={styles.container}> */}
      {/* Takes in the prop it will render, take into stack, */}
    <Stack.Screen name="Home" component={TeesTunes} />
    <Stack.Screen name="Likes" component={LikePage} initialParams={{ artists: 'No Songs Yet' }}/>
      {/* <StatusBar style="light" />
    </View> */}
    </Stack.Navigator>
    </NavigationContainer>
    </ColorModeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581845',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



{/* <Switch value={mode} 
onValueChange = {(value) =>{
setMode(value);
EventRegister.emit("changeTheme", mode)
}}/> */}