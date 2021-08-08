import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,TextInput,Pressable,Picker,ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import  MyDrawer from '../../Routes/Drawer'
import  MyDrawerOwner from '../../Routes/DrawerOwner' 
import Axios from "axios"
import Decode from "jwt-decode"
import {setUser} from '../../Store/Acions/setUsers'
import {Provider,connect} from 'react-redux'
import {SetOffer} from '../../Store/Acions/SetOffers'


const loginSchema = yup.object({
   email : yup.string().required().email(),
   password : yup.string().required().min(4),
   // type: yup.string().required()
})
 
function SignUp({ navigation, setUsers, SetOffers }) {

   const [selectedValue, setSelectedValue] = useState("etudiant");
   const [status, setStatus] = useState(0)

   

    const sendData = (email,password) => {
      
      let data= {
        email,
        password,
        status: selectedValue

      }
     Axios.post(global.MyVar+"/SignUp", data)
     .then(res => {
        
        let user=Decode(res.data)
        console.log(user)
        if(user.sub.status == "etudiant") setStatus(1)
        if(user.sub.status == "owner") {
          setStatus(2)
          SetOffers()
        }
        setUsers(user.sub)
        alert("Welcome to your IHome accounte, start searching...")

     }).catch(err => {
      alert("Try again and veridy your informations.")
        console.log(err)
     })
      
  }

  return (
   <View style={styles.container} > 
   {status== 0 ?
    <ScrollView style={styles.container}>
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
            sendData(values.email,values.password,selectedValue)
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

                  <View style={styles.picker}> 
                     <Picker
                        selectedValue = {selectedValue}
                        value={formikProps.values.type}
                        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue)}}
                        itemStyle={styles.input}
                     >
                        <Picker.Item
                         label="Student"
                         value="etudiant"
                         color='#8E7D7D'
                        //  fontSize={30}
                        />
                        <Picker.Item 
                         label="House owner"
                         value="owner"
                         color='#8E7D7D' 
                        />
                     </Picker>
                  </View>

                  <Pressable style={styles.loginButton} onPress={formikProps.handleSubmit}>
                     <Text style={styles.loginText}>Sign Up</Text>
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

      <Pressable  onPress={ ()=>{navigation.navigate('Login')} }>
         <Text style={styles.text}>
            Already have an account ?
          <Text style ={styles.textUnderLine}> Sign In </Text>
         </Text>
        </Pressable>
    </ScrollView>
    :null }
     {status == 1 ? <MyDrawer /> : null}
    {status== 2 ? <MyDrawerOwner /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 105,
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
    textDecorationLine: 'underline'
  },
  errorText:{
    marginHorizontal: 60,
    fontSize: 12,
    color: 'crimson',
    fontWeight: 'bold'
  },
  picker:{
    marginHorizontal: 40,
    marginVertical: 15,
    borderWidth : 2,
    borderColor : "#5044A3",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
  }
});
const mapDispatchToProps = (dispatch) => {
    return {
      setUsers: (data) => dispatch(setUser(data)),
      SetOffers: (data) => dispatch(SetOffer())
    }
}

export default connect(null,mapDispatchToProps)(SignUp)