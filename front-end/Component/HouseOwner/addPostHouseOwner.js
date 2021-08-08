import React , {useState} from 'react';
import { StyleSheet, Text, View,TextInput,Pressable,CheckBox,ScrollView } from 'react-native';
import {  Formik } from 'formik';
import * as yup from 'yup';
import MyImagePicker from './myImagePicker';
import Axios from "axios"
import {connect} from 'react-redux'
import { AddPost } from '../../Store/Acions/AddPost';

const addPostSchema = yup.object({
   localAdress : yup
      .string()
      .required("Local adress field is required")
      .min(10,"Local adress must be at least 10 characters"),
   roomsNumber : yup.number().integer()
      .required("Number of rooms field is required")
      .min(1,"Your post must have at least one room")
      .max(10),
   title : yup.string().required(),
   price : yup.number().integer()
   .required("The price is required")
   .min(500,"The price must be more than 500 Dhs")
   .max(10000),
})
 
 function AddPostHouseOwner(props) {
   const [waterElectricityIsSelected,setWaterElectricityIsSelected] = useState(true);
   const [equipedHouseIsSelected,setEquipedHouseIsSelected] = useState(true);
   const [images,setImages] = useState([]);
   const [status,setStatus] = useState("notSubmited")

   const sendData = (title,water,equiped, roomsNumber, prix, address ) => {

      let charges= water == true ? "yes" : "non"
      let equied= equiped == true ? "yes" : "non"

      let data= new FormData()
       
      data.append("file1",{
         name: 1+"."+images[0].substring(images[0].length-3,images[0].length),
         uri :images[0],
         type: 'image/jpg'
      
      })

      if(images[1] != null){
      data.append("file2",{
         name: 2+"."+images[1].substring(images[1].length-3,images[1].length),
         uri :images[1],
         type: 'image/jpg'
      
      })
      }
      if(images[2] != null)
         data.append("file3",{
            name: 3+"."+images[2].substring(images[2].length-3,images[2].length),
            uri :images[2],
            type: 'image/jpg'
         
         })
      if(images[3] != null)
         data.append("file4",{
            name: 4+"."+images[3].substring(images[3].length-3,images[3].length),
            uri :images[3],
            type: 'image/jpg'
         
         })
      if(images[4] != null)
         data.append("file5",{
            name: 5+"."+images[4].substring(images[4].length-3,images[4].length),
            uri :images[4],
            type: 'image/jpg'
         
         })

      data.append("title",title)
      data.append("owner", props.user.email)
      data.append("charges",charges)
      data.append("nChamber",roomsNumber)
      data.append("equiped",equied)
      data.append("prix",prix)
      data.append("date",new Date().toString())
      data.append("address",address)

      Axios.post(global.MyVar+"/Addpost", data)
      .then(res => {
         console.log(res.data.post)
         props.addPost(res.data.post)
         setStatus('Submited')
         alert("Post ADDED!")
      }).catch(err => {
         alert("Try again")
         console.lor(err)
      })

   }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add new post now</Text>

      <Formik
         initialValues={{ localAdress: '',  roomsNumber: '', title:'', price : '' }}
         validationSchema = {addPostSchema}
         onSubmit= { (values) => {
            
            
            sendData(values.title, waterElectricityIsSelected, equipedHouseIsSelected,values.roomsNumber , values.price, values.localAdress )
            

           
         }}

      >
         { 
            formikProps => (
               <View>
                  <TextInput
                     placeholder = 'Title'
                     onChangeText = {formikProps.handleChange('title')}
                     onBlur={formikProps.handleBlur('title')}
                     value = {formikProps.values.title}
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     style = {styles.input}
                     multiline
                  />
                  <TextInput
                     placeholder = 'Local adress'
                     onChangeText = {formikProps.handleChange('localAdress')}
                     onBlur={formikProps.handleBlur('localAdress')}
                     value = {formikProps.values.localAdress}
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     style = {styles.input}
                     multiline
                  />
                  <Text style={styles.errorText}>
                   { formikProps.touched.localAdress && formikProps.errors.localAdress }
                  </Text>

                  <View style={[styles.input,styles.checkbox]}>
                     <Text style={styles.label}>Include water and electricity ?</Text>
                     <CheckBox
                        value={waterElectricityIsSelected}
                        onValueChange={setWaterElectricityIsSelected}
                     />
                  </View>

                  <View style={[styles.input,styles.checkbox]}>
                     <Text style={styles.label}>Equiped house ?</Text>
                     <CheckBox
                        value={equipedHouseIsSelected}
                        onValueChange={setEquipedHouseIsSelected}
                     />
                  </View>

                  <TextInput  
                     placeholder="Enter the number of rooms"  
                     // underlineColorAndroid='transparent' 
                     onChangeText = {formikProps.handleChange('roomsNumber')}
                     onBlur={formikProps.handleBlur('roomsNumber')}
                     value = {formikProps.values.roomsNumber}
                     style={styles.input}  
                     keyboardType={'numeric'} 
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     textAlign={'center'}
                  /> 
                  <Text style={styles.errorText}>
                   { formikProps.touched.roomsNumber && formikProps.errors.roomsNumber }
                  </Text>
                  <TextInput  
                     placeholder="Enter the price"  
                     // underlineColorAndroid='transparent' 
                     onChangeText = {formikProps.handleChange('price')}
                     onBlur={formikProps.handleBlur('price')}
                     value = {formikProps.values.price}
                     style={styles.input}  
                     keyboardType={'numeric'} 
                     fontSize={18}
                     fontWeight={'bold'}
                     placeholderTextColor={'#8E7D7D'}
                     textAlign={'center'}
                  /> 
                  <Text style={styles.errorText}>
                   { formikProps.touched.price && formikProps.errors.price }
                  </Text>

                  <MyImagePicker setImages={setImages} status={status} />

                  <Pressable style={styles.submitButton} onPress={() => formikProps.handleSubmit()}>
                     <Text style={styles.submitText}>Submit</Text>
                  </Pressable>
               </View>
            )
         }
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
   textAlign:'center',
   marginTop: 10,
   marginBottom: 25,
   fontSize: 27,
   color:"#5044A3",
   fontWeight: 'bold', 
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
  submitButton : {
    backgroundColor: "#5044A3",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    borderRadius: 4,
    // elevation: 3,
    marginHorizontal: 85,
    marginVertical: 15,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
  },
  submitText : {
    fontSize: 18,
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
  checkbox: {
   //  alignSelf: "center",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
      fontSize:15,
      fontWeight:'bold',
      color:'#8E7D7D'
  }
});

const mapStateToProps = (state) =>{

   return {
      user: state.UserReducer.User
   }
}

const mapDisptachToProps = (dispatch) => {
   return {
     addPost : (data) => dispatch(AddPost(data))
   }
}

export default connect(mapStateToProps,mapDisptachToProps)(AddPostHouseOwner)