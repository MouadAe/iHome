import { createDrawerNavigator } from '@react-navigation/drawer'

import { createAppContainer, NavigationActions } from "react-navigation";
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Bills from "../Component/Bills";
import { NavigationContainer } from "@react-navigation/native";
import Nav from "./Nav";
import { StyleSheet,View, Text ,Image, TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import AddPost from "../Component/HouseOwner/addPostHouseOwner"
import RequestPost from "../Component/HouseOwner/houseOwnerRequests";
import editFormStack from "./editFormStack"
import FinancialSpace from "../Component/FinancialSpace";
import Login from '../Component/registration/login';

const Stack=createStackNavigator()
function AddPostOw({navigation}) {

    return (
     
        <Stack.Navigator >
          <Stack.Screen name="Add Post" component={AddPost}   
          options={{
            title:'',
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
  function RequestOwner({navigation}) {
  
      return (
       
          <Stack2.Navigator >
            <Stack2.Screen name="Requests" component={RequestPost}   options={{
             title: '',
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
  function FinancialStack({navigation}) {
  
      return (
       
          <Stack3.Navigator >
            <Stack3.Screen name="Financial Space" component={FinancialSpace}   options={{
             title: '',
             headerLeft : (size)=>(
            //    <TouchableOpacity  onPress={()=>navigation.openDrawer()}> 
            //      <Image
            //   source={require('../assets/drawerIcon.png') }
            //   style={[{ height:'70%',width:45,margin : 5}]}
             
              
            // /></TouchableOpacity>
            <Entypo name="menu" size={30} color="#5044A3" onPress={()=>navigation.openDrawer()} 
            style={[{ margin : 5}]}
            />
        
             )
          }}
          /> 
            
          </Stack3.Navigator> 
           
      );
    }

  const Drawer = createDrawerNavigator();

  const DrawerOwner=()=> {
    return (
        
            <Drawer.Navigator drawerContentOptions={{
        
              labelStyle:{color: "#5044A3",fontWeight:"bold",fontSize:19,marginTop:5}
            }}  >
                <Drawer.Screen name="Home" component={editFormStack}   options={{
               title: 'Home',
               drawerIcon: ({focused, size}) => (
                 <Entypo name="home" size={30} color="#5044A3"  
                 style={[{ margin : 5}]}
                 />
             
               ),
               
            }} />
                <Drawer.Screen name="New Post" component={AddPostOw} 
                 options={{
                  drawerIcon: ({focused, size}) => (
                   <Image
                           source = {require("../assets/add-file.png")}
                           style={{marginHorizontal:5,marginTop:8}}
                      
                           />  
                
                  ),
                  
               }}
                
                
                />
                <Drawer.Screen name="Requests" component={RequestOwner}
                   options={{
                    drawerIcon: ({focused, size}) => (
                     <Image
                             source = {require("../assets/add-friend.png")}
                             style={{marginHorizontal:5,marginTop:8}}
                        
                             />  
                  
                    ),
                    
                 }}  
                
                />
                <Drawer.Screen name="Financial Space" component={FinancialStack}
                 options={{
                  drawerIcon: ({focused, size}) => (
                   <Image
                           source = {require("../assets/money.png")}
                           style={{marginHorizontal:5,marginTop:8}}
                      
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
                    style={{marginHorizontal:5,marginTop:8}}
               
                    />  
                
                  ),
                  
               }} 
                
                />
            </Drawer.Navigator>
        
    );
  }
export default DrawerOwner