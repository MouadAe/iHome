import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Component/registration/login'
import SignUp from '../Component/registration/signUp'


const Stack = createStackNavigator();
const LoginStack = () => {
   return (
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>   
   )
}

export default LoginStack