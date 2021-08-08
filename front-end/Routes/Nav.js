import React from 'react'
import { NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Offers from '../Component/Offers';
import Favorites from '../Component/Favorites';
import Profile from '../Component/Profile';
import MyDrawer from './Drawer';
import { Image, TouchableOpacity} from 'react-native'
import StartApp from '../Component/StartApp'
import Store from '../Store/Store'
import {Provider,connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import OfferDetails from "../Component/OfferDetails"
import { Entypo } from '@expo/vector-icons' 

const Stack=createStackNavigator()

function HomeStack({navigation}) {

  return (
   
      <Stack.Navigator initialRouteName="Offers" >
          <Stack.Screen 
            name="Offers" 
            component={StartApp}
            options={{
            title: '',
             headerShown: true,
             headerLeft : (size)=>(

              <Entypo name="menu" size={30} color="#5044A3" onPress={()=>navigation.openDrawer()} 
              style={[{ margin : 5}]}
               
                
              />
               
               )
             }}
           /> 
           <Stack.Screen 
            name="OfferDetails" 
            component={OfferDetails}
            options={{
            title: '',

             headerShown: false,
             headerLeft : (size)=>(

              <Entypo name="menu" size={30} color="#5044A3" onPress={()=>navigation.openDrawer()} 
              style={[{ margin : 5}]}
               
                
              />
               
               )
             }}
           /> 
        
      </Stack.Navigator> 
       
  );
}


const Stack2=createStackNavigator()

function FavoriteStack({navigation}) {

  return (
   
      <Stack2.Navigator initialRouteName="Favorites" >
        <Stack2.Screen name="Favorites" component={Favorites} 
           
           options={{
           title: '',
           headerLeft : (size)=>(

          <Entypo name="menu" size={30} color="#5044A3" onPress={()=> navigation.openDrawer()} 
          style={[{ margin : 5}]}
 
          />
           
           )
        }}/>
        <Stack2.Screen 
            name="OfferDetails" 
            component={OfferDetails}
            options={{
            title: '',

             headerShown: false,
             headerLeft : (size)=>(

              <Entypo name="menu" size={30} color="#5044A3" onPress={()=>navigation.openDrawer()} 
              style={[{ margin : 5}]}
               
                
              />
               
               )
             }}
           /> 
      </Stack2.Navigator> 
    
    
  );
}

const Stack3=createStackNavigator()

function LoginInfoStack({navigation}) {

  return (
   
      <Stack3.Navigator initialRouteName="Infos" >
        <Stack3.Screen name="Profile" component={Profile}
             
             options={{
              
              headerLeft : (size)=>(
   
             <Entypo name="menu" size={30} color="#5044A3" onPress={()=> navigation.openDrawer()} 
             style={[{ margin : 5}]}
              
               
             />
              
              )
           }}/>
      </Stack3.Navigator> 
    
    
  );
}
const Tab=createBottomTabNavigator();
const Nav = () => {

  const getTabBarVisibility = (route) => {
    
      const routeName = getFocusedRouteNameFromRoute(route)
    
      if (routeName === 'OfferDetails') {
        return false;
      }

      return true;
  }
  
    return (
        
        <Tab.Navigator
        screenOptions= {({route}) => ({
        tabBarIcon : ({ focused, color, size}) => {
          let icon 
          let col
          if(route.name == 'Offers'){
            
            icon=focused ? 'home' :'home'
            col=focused ?  '#E4DDBE' :'#5044A3'
            return  <MaterialCommunityIcons name={icon} size={30} color={col} />

          }else if(route.name=='Favos'){

            icon=focused ? 'favorite' :'favorite'
            col=focused ?  '#E4DDBE' :'#5044A3'
            return <MaterialIcons 
                   name={icon}
                   size={30} color={col} />
          }else if(route.name=='UserInfo'){

             col=focused ?  '#E4DDBE' :'#5044A3'
            return <FontAwesome name="user" size={30} color={col} />
          }
          
        }
      })}
      tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          showLabel : false,
          showIcon : true,
          activeBackgroundColor: '#5044A3', 
          inactiveBackgroundColor: '#E4DDBE',
        }}
      >
         <Tab.Screen name="Offers" component={HomeStack}
            options={({ route }) => ({
              tabBarVisible: getTabBarVisibility(route)
            })}
          />
         <Tab.Screen name="Favos" component={FavoriteStack} 
            options={({ route }) => ({
              tabBarVisible: getTabBarVisibility(route)
            })}
         />
         <Tab.Screen name="UserInfo" component={LoginInfoStack} />
      </Tab.Navigator>
    )
}



export default Nav
