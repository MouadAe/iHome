import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Image,TouchableOpacity,Modal,FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios'
import {connect} from 'react-redux'

const houseOwnerRequests = (props) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [modalAcceptOpen, setModalAcceptOpen] = useState(false);
   const [personAccepted,setPersonAccepted] = useState([]);
   const [personSelected,setPersonSelected] = useState();
   const [requestListSelected,setRequestListSelected] = useState([])
   const [requests, setRequests] = useState([])
   
   useEffect(() => {
      Axios.get(global.MyVar+"/GetRequest/"+props.user.email)
            .then( res => {
                  console.log(res.data.requests)
                  setRequests(res.data.requests)
            })
            .catch(err => {
                  console.log(err)
            })


   },[])
   const ifAccepted = (data) => {
      for(let i=0 ; i< data.length; i++){
            if(data[i].status === "Accepted") return null
      }
      return false
   }
   const sendData = (item) => {

      let data={
         "postId" : item.postId,
         "userName":item.userName,
         "reqId" : item._id.$oid
      }
      Axios.post(global.MyVar+"/UpdateStatus",data)
      .then( res => {
            console.log(res.data.requests)
            setRequests(res.data.requests)
      })
      .catch(err => {
            console.log(err)
      })
   }

   return (
      <ScrollView style={styles.container}>
         <Text style={styles.title}>Your Requests</Text>
         <FlatList style={styles.listItems} data={requests} keyExtractor={(item, index) => index.toString()}

          renderItem={ ({item}) =>

            
            (item.requests.length !== 0) &&
            <TouchableOpacity
               style={styles.imageContainer}
               activeOpacity={1} 
               onPress = { () => {
                  setModalOpen(!modalOpen);
                  setRequestListSelected(item.requests)
               }}
            >
               <Image
                  source={{uri:global.MyVar+'/images/1_'+item.id_post+'.jpg'}} 
                  style={styles.image}
               />
               <Text style={styles.imageDescription}>
                  {
                     (item.requests.length === 1) ? 
                     "One Request..." :
                     item.requests.length + " Requests..." 
                  } 
               </Text>
            </TouchableOpacity>
         } />
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalOpen}
               onRequestClose={() => {
                  // this.closeButtonFunction()
               }}
            >
               <View style={styles.modal}>
                  <MaterialIcons 
                     name='close' 
                     size={24} 
                     style={{alignSelf:'center',marginVertical:12}}
                     onPress={() => setModalOpen(false)} 
                  />
                  <ScrollView>
                     <FlatList
                      data={requestListSelected}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem = { ({item}) =>
                        <View style={styles.modalItem}>
                           <Text style={styles.modalItemText}>
                              Request from {item.userName.split("@")[0]} {'\n'}
                              Price : {item.prix} DH
                           </Text>
                           <View style={{flexDirection:'row'}}>
                              <MaterialIcons 
                                 name='check'
                                 color='green' 
                                 size={24} 
                                 style={{alignSelf:'center',marginHorizontal:5}}
                                 onPress={ () => {
                                    setModalAcceptOpen(true)
                                    setPersonSelected(item)
                                    
                                 }} 
                              />                            
                              <Modal
                                 animationType="fade"
                                 transparent={true}
                                 visible={modalAcceptOpen}
                                 // onRequestClose={() => {
                                 //    // setModalOpen(!modalOpen);
                                 // }}
                              >
                                 <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                       <Text style={styles.modalText}>Accept this request ?</Text>
                                       <View style={{flexDirection:'row'}}>
                                          <Pressable
                                             style={[styles.button, styles.buttonAccept]}
                                             onPress={ () => {
                                                setPersonAccepted({...personSelected,state:'Accepted'})
                                                sendData({...personSelected,state:'Accepted'})
                                                requestListSelected.splice(0,requestListSelected.length)
                                                setModalAcceptOpen(!modalAcceptOpen)
                                                setModalOpen(false);
                                             }}
                                          >
                                             <Text style={styles.textStyle}>Accept</Text>
                                          </Pressable>
                                          <Pressable
                                             style={[styles.button, styles.buttonCancel]}
                                             onPress={() => setModalAcceptOpen(!modalAcceptOpen)}
                                          >
                                             <Text style={styles.textStyle}>Cancel</Text>
                                          </Pressable>
                                       </View>
                                    </View>
                                 </View>
                              </Modal>

                           </View>
                        </View>  
                  } />
                  </ScrollView>    
               </View>
            </Modal>
      </ScrollView>
   )
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

   listItems:{
      alignSelf: 'center'
   },
  imageContainer:{
      marginVertical :30,
  },
  image: {
      width: 250,
      height : 250,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
  },
  imageDescription:{
      backgroundColor: '#5044A3',
      color: '#fff',
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
      paddingVertical:15,
      width:250,
      borderBottomLeftRadius: 13,
      borderBottomRightRadius: 13,
  },
     modal: {
      height: '55%',
      marginTop: 'auto',
      backgroundColor:'#E4DDBE',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
   },
   modalItem: {
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:30,
      marginHorizontal: 25,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderWidth : 1,
      borderColor : "#000",
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      borderBottomLeftRadius: 13,
      borderBottomRightRadius: 13,
   },
   modalItemText:{
      // textAlign: 'center',
      fontWeight: "bold",
      fontSize: 15
   },
  // Modal Accpet style ---------------------------------------------------------------
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
  buttonAccept: {
    backgroundColor: "green",
  },
  buttonCancel: {
    backgroundColor: "#E4DDBE",
  },


})

const mapStateToProps = (state) => {
   return {
     user: state.UserReducer.User,
     
   }
}

export default connect(mapStateToProps)(houseOwnerRequests)