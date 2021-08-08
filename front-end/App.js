import { StatusBar } from 'expo-status-bar';
import React , {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Offers from './Component/Offers'
import StartApp from './Component/StartApp'
import Favorites from './Component/Favorites'
import Profile from './Component/Profile'
import Store from './Store/Store'
import {Provider,connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import OfferDetails from "./Component/OfferDetails"
import MyDrawer from './Routes/Drawer';
import LoginStack from './Routes/loginStack'


 function App(props) {

  global.MyVar="http://047a4e980b5d.ngrok.io"
  console.disableYellowBox = true;   

  return (

  <Provider store={Store}>
    <NavigationContainer > 
      <LoginStack />
    </NavigationContainer > 
    
  </Provider>  
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App