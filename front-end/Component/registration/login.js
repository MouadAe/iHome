import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image,TextInput,Pressable,ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import  MyDrawer from '../../Routes/Drawer'
import  MyDrawerOwner from '../../Routes/DrawerOwner' 
import Axios from "axios"
import Decode from "jwt-decode"
import {setUser} from '../../Store/Acions/setUsers'
import {connect} from 'react-redux'
import {SetOffer} from '../../Store/Acions/SetOffers'


const loginSchema = yup.object({
   email : yup.string().required().email(),
   password : yup.string().required().min(4)
})
 
function Login({ navigation, setUsers,SetOffers }) {
  const [status, setStatus] = useState(0)

  
   

  const sendData = (email,password) => {

      let data= {
        email,
        password
      }
     Axios.post(global.MyVar+"/Login", data)
     .then(res => {
        
        let user=Decode(res.data)
        if(user.sub.status == "etudiant") setStatus(1)
        if(user.sub.status == "owner") {
          SetOffers()
          setStatus(2)
        }

        setUsers(user.sub)
        alert("Welcome to your IHome accounte, start searching...")
     }).catch(err => {
      alert("Try again or signUp if you don't have an accounte.")
        console.log(err)
     })
      

  }
  return (
    <View style={styles.container}>
    {status == 0 ? 
    <View >
      <View style={styles.imageContainer}>
        <Image 
          style={styles.logo}
          source = {require('./images/iHome.png')}
        />
      </View>
      <Formik
         initialValues={{ email: '', password: ''}}
         validationSchema = {loginSchema}
         onSubmit= { (values) => {
            let email= values.email
            let password = values.password
            sendData(email,password)
         }}
      >
         { 
            formikProps => (
               <View>
                  <TextInput
                     placeholder = 'Email'
                     onChangeText = {formikProps.handleChange('email')}
                     onBlur={formikProps.handleBlur('email')}
                     value = {formikProps.values.email}
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     style = {styles.input}
                  />
                  <Text style={styles.errorText}>
                   { formikProps.touched.email && formikProps.errors.email }
                  </Text>
                  <TextInput
                     placeholder = 'Password'
                     onChangeText = {formikProps.handleChange('password')}
                     value = {formikProps.values.password}
                     onBlur={formikProps.handleBlur('password')}
                     secureTextEntry={true}
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     style = {styles.input}
                  />
                  <Text style={styles.errorText}>
                   { formikProps.touched.password && formikProps.errors.password }
                  </Text>

                  <Pressable style={styles.loginButton} onPress={formikProps.handleSubmit}>
                     <Text style={styles.loginText}>Login</Text>
                  </Pressable>
               </View>
            )
         }
      </Formik>

      {/*
      <Pressable style={styles.loginButton} onPress={ ()=>{} }>
      <Text style={styles.loginText}>Login using gmail</Text>
      </Pressable>
      */}
        <Pressable onPress={ ()=>{navigation.navigate('SignUp')} }>
          <Text style={styles.text}>
            Don’t have any account ? 
              <Text style ={styles.textUnderLine}> Sign Up </Text>
          </Text>
        </Pressable>
      
    </View>
    : null }
    {status== 1 ? <MyDrawer /> : null}
    {status== 2 ? <MyDrawerOwner /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : "center"
   
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 270,
    height: 85,
    resizeMode: "center"
  },
  input: {
    marginHorizontal: 40,
    marginVertical: 15,
    borderWidth : 2,
    borderColor : "#5044A3",
    paddingHorizontal: 30,
    paddingVertical: 17,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
  },
  loginButton : {
    backgroundColor: "#5044A3",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    borderRadius: 4,
    // elevation: 3,
    marginHorizontal: 40,
    marginVertical: 15,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
  },
  loginText : {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text:{
    marginTop: 25,
    color: "#8E7D7D",
    fontSize: 16,
    textAlign: 'center'
  },
  textUnderLine:{
    color: "#8E7D7D",
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText:{
    marginHorizontal: 60,
    fontSize: 12,
    color: 'crimson',
    fontWeight: 'bold'
  }
});

const mapDispatchToProps = (dispatch) => {
    return {
      setUsers: (data) => dispatch(setUser(data)),
      SetOffers: (data) => dispatch(SetOffer())
    }
}

export default connect(null,mapDispatchToProps)(Login)