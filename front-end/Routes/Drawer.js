import { createDrawerNavigator,DrawerItem } from '@react-navigation/drawer'

import { createAppContainer, NavigationActions } from "react-navigation";
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Bills from "../Component/Bills";
import { NavigationContainer } from "@react-navigation/native";
import Nav from "./Nav";
import { StyleSheet,View, Text ,Image, TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import Login from '../Component/registration/login';



const Stack=createStackNavigator()
function BillsStack({navigation}) {

    return (
     
        <Stack.Navigator >
          <Stack.Screen name=" " component={Bills}   options={{
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

  

  const Drawer = createDrawerNavigator();

  const MyDrawer=({navigation})=> {
    return (
        
            <Drawer.Navigator   drawerContentOptions={{
      
              labelStyle:{color: "#5044A3",fontWeight:"bold",fontSize:19,marginTop:5}
            }} >
                <Drawer.Screen name="Home" component={Nav} 
                 
                 options={{
               
                  title: 'Home',
                  drawerIcon: ({focused, size}) => (
                    <Entypo name="home" size={30} color="#5044A3"  
                    style={[{ margin : 5}]}
                    />
                
                  ),
                  
               }}
               
                />
                <Drawer.Screen name="Your Bills" component={BillsStack}  options={{
               drawerIcon: ({focused, size}) => (
                <Image
                        source = {require("../assets/invoice.png")}
                        style={{marginHorizontal:7,marginVertical:5}}
                   
                        />  
             
               ),
               
            }}
             />
               <Drawer.Screen name=' ' component={Login}
                options={{
                  title: 'Logout',
                  drawerIcon: ({focused, size}) => (
                    <Image
                    source = {require("../assets/logout.png")}
                    style={{marginHorizontal:7,marginTop:8}}
               
                    />  
                
                  ),
                  
               }} 
                
                />
                
            </Drawer.Navigator>
        
    );
  }
export default MyDrawer