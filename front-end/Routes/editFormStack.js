import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditPostPage from '../Component/HouseOwner/editPostPage';
import EditPostFormHO from '../Component/HouseOwner/editPostFormHO'
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();
const editFormStack = ({navigation}) => {
   return (
      <Stack.Navigator  >
        <Stack.Screen
          name="Your Posts"
          component={EditPostPage}
           options={{
              title:'',
           headerLeft : (size)=>(
          
          <Entypo name="menu" size={30} color="#5044A3" onPress={()=>navigation.openDrawer()} 
          style={[{ margin : 5}]}
          />
      
           )
        }}
         //  options={{ title: 'Welcome' }}
        />
        <Stack.Screen options={{title:''}} name="Edit Post" component={EditPostFormHO} />
      </Stack.Navigator>   
   )
}

export default editFormStack
