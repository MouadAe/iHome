import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,Pressable,CheckBox,ScrollView,Modal } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import MyImagePicker from './myImagePicker';
import { MaterialIcons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import Axios from 'axios'
import {DeletePost} from '../../Store/Acions/DeletePost'

const addPostSchema = yup.object({
   localAdress : yup
      .string()
      .required("Local adress field is required")
      .min(10,"Local adress must be at least 10 characters"),
   roomsNumber : yup.number().integer()
      .required("Number of rooms field is required")
      .min(1,"Your post must have at least one room")
      .max(10),
   price : yup.number().integer()
      .required("The price is required")
      .min(500,"The price must be more than 500 Dhs")
      .max(10000),
})
 
function editPostFormHO(props) {
   const [waterElectricityIsSelected,setWaterElectricityIsSelected] = useState(true);
   const [equipedHouseIsSelected,setEquipedHouseIsSelected] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);
   const [images,setImages] = useState([])
   

  useEffect(() => {

    
    let postActuel=props.Offers.find(item => item._id.$oid == props.route.params.id)
   // console.log(postActuel)

  },[]) 

  const sendData = (price,address,water,equiped,nChamber) => {

    let charges= water == true ? "yes" : "non"
    let equied= equiped == true ? "yes" : "non"
    let data ={
      "id": props.route.params.id,
      charges,
      nChamber,
      "equiped": equied,
      "prix" : price,
      address
    }

    
    Axios.post(global.MyVar+"/Updatepost", data)
      .then(res => {
         console.log(res.data)
         
         
      }).catch(err => {
         console.log(err)
      })
  }
  const deletePost = () => {

    let data ={
      "id": props.route.params.id,
    }

    Axios.post(global.MyVar+"/Deletepost", data)
      .then(res => {
         console.log(res.data)
         setModalOpen(!modalOpen)
         props.deletePost(props.route.params.id)

      }).catch(err => {
         console.log(err)
      })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.title}>Edit this post</Text>
         <MaterialIcons 
            name='delete'
            color='red' 
            size={35} 
            style={styles.icon} 
            onPress={() => setModalOpen(!modalOpen)} 
         />
      </View>
      <Formik
         initialValues={{ localAdress: '',  roomsNumber: '' }}
         validationSchema = {addPostSchema}
         onSubmit= { (values) => {

            sendData(values.price,values.localAdress,waterElectricityIsSelected,equipedHouseIsSelected,values.roomsNumber)
           
         }}
      >
         { 
            formikProps => (
               <View>
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
               

                  <Pressable style={styles.submitButton} onPress={() => formikProps.handleSubmit() }>
                     <Text style={styles.submitText}>Submit</Text>
                  </Pressable>
               </View>
            )
         }
      </Formik>
      { 
         //    Modal ============================================ in 
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalOpen(!modalOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete this post ?</Text>
            <View style={{flexDirection:'row'}}>

               <Pressable
               style={[styles.button, styles.buttonDelete]}
               onPress={() => deletePost()}
               >
               <Text style={styles.textStyle}>Delete</Text>
               </Pressable>

               <Pressable
               style={[styles.button, styles.buttonCancel]}
               onPress={() => setModalOpen(!modalOpen)}
               >
               <Text style={styles.textStyle}>Cancel</Text>
               </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {
         //====================================================
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header :{
   marginHorizontal: 70,
   marginTop: 20,
   marginBottom: 50,
   flexDirection:'row',
   justifyContent:'space-between'
   },
   title: {
      fontSize: 27,
      fontWeight: 'bold',
      color:"#5044A3",

   },
   icon:{
      // alignItems:'center'
      paddingTop: 3
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
  },
  // Modal style ---------------------------------------------------------------
   centeredView: {
    flex: 1,
   //  justifyContent: "center",
    marginTop:270,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal:20,
    margin:5,
    elevation: 2
  },
  buttonDelete: {
    backgroundColor: "crimson",
  },
  buttonCancel: {
    backgroundColor: "#E4DDBE",
  },
});

const mapStateToProps = (state) => {
  //console.log(state)
 return  {
   Offers: state.GetOffers.Offers,
 }
}

const mapDisptachToProps = (dispatch) => {
    return {
      deletePost : (data) => dispatch(DeletePost(data))
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(editPostFormHO)