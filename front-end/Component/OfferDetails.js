import React,{useState, useEffect} from "react"
import {ActivityIndicator,Modal, Pressable, StyleSheet,Text,TextInput,View,Button,Image,FlatList,TouchableOpacity} from 'react-native';
import Axios from 'axios'
import {connect} from 'react-redux'
import {setFavorite} from '../Store/Acions/setFavorite'

function OfferDetails (props){
      const [post, setPost]= useState({})
      const [demande, setDemande]= useState(false)
      const [refersh, setRefersh]= useState(false)
      const [modalVisible, setModalVisible] = useState(false);
      const [text, onChangeText] = useState("");
      const [isCancel, setIscancel] = useState()

      useEffect(() => {

            if(refersh == false){
            Axios.get(global.MyVar+"/GetOnePost/"+props.route.params.id+"_"+props.user.email)
            .then( res => {
                  console.log(res.data)
                  setPost(res.data.post)
                  if(res.data.demande){
                        console.log("in demande")
                        setDemande(res.data.demande)
                  }
                  setRefersh(true)
            })
            .catch(err => {
                  console.log(err)
            })
         }
      })

      const sendRequest = () => {

            let price = text =="" ? post.prix : text
            let req={"postId" :post._id.$oid,
                     "prix" :price,
                     "userName": props.user.email, 
                     "owner" : post.owner,
                     "date" : new Date()
               }

            Axios.post(global.MyVar+"/AddDemande",req)
            .then( res => {
                  console.log(res.data)
                  setRefersh(false)
                  setModalVisible(!modalVisible)
            })
            .catch(err => {
                  console.log(err)
            })
      }
      const DeletRequest = () => {

            let req={"postId" :demande._id.$oid}
            Axios.post(global.MyVar+"/DeleteDemande",req)
            .then( res => {
                  console.log(res.data)
                  setRefersh(false)
                  setDemande(false)
                  setModalVisible(!modalVisible)
            })
            .catch(err => {
                    console.log(err)
            })
      }

      const setFavorite = () => {
        props.setFav(post)
      }

      const displayIcon = () => {
      
        let src=require('../images/Vector.png')

        if(props.favoritePosts.findIndex((item) => (item._id.$oid === post._id.$oid)) !== -1){
           src=require('../images/Vector_in.png') 
        }
        
      return (
        <Image 
            style={styles.title_Img}
        source={src}
        />
        )
    }

      let imageNom=[]
      let imageNom2= null
      let imageNom3= null
      let imageNom4= null
      let imageNom5= null
      
      if(post.image1 != undefined){
             imageNom=post.image1.split('.')
             imageNom2=  post.image2 != "NOT_SET" ? post.image2.split('.') : null
             imageNom3=  post.image3 != "NOT_SET" ? post.image3.split('.') : null
             imageNom4=  post.image4 != "NOT_SET" ? post.image4.split('.') : null
             imageNom5=  post.image5 != "NOT_SET" ? post.image5.split('.') : null
      }
      if(post._id != undefined ){
	return (
		<View style={styles.container}>
			
                  <Image 
			style={styles.offerImg}
			source={{ uri : global.MyVar+'/images/'+imageNom[0]+'_'+post._id.$oid+'.'+imageNom[1]}}
			/>
			<View style={styles.offerInfo}>
				<View style={styles.offerInfo_title} >
					<Text style={styles.title_Text} >{post.title}</Text>
          <Pressable
            onPress={() => {setFavorite()}}
          >
					{displayIcon()}
          </Pressable>

				</View> 
				<View style={styles.offerInfo_Content}> 
					<View style={styles.content} >
						<Image 	
						style={styles.billIcon}
						source={require("../images/bill.png")}
						/>
                                    {post.charges != "non" ? <Text style={styles.billText} > Water & Electricity bill included</Text>
                                    :<Text style={styles.billText} > Water & Electricity bill not included</Text> }
							
					 </View>
					<View style={styles.content}>
						<Image 	
						style={styles.billIcon}
						source={require("../images/chamber.png")}
						/>
                                    {post.nChamber==1 ? <Text style={styles.billText} >One chamber only</Text>
                                    :<Text style={styles.billText} > {post.nChamber} Chambers</Text> }
							
					</View>
					<View style={styles.content}> 
						<Image 	
						style={styles.billIcon}
						source={require("../images/home.png")}
						/>
                                    {post.equiped== "yes" ? <Text style={styles.billText} >Equiped</Text>
                                    : <Text style={styles.billText} >Not Equiped</Text>}
							
					</View>
				</View>

				<View style={styles.offerInfo_Pictuers}> 
                              {imageNom2 != null ? 
                                    <Image      
                                    style={styles.OfferImg}
                                    source={{ uri : global.MyVar+'/images/'+imageNom2[0]+'_'+post._id.$oid+'.'+imageNom2[1]}}
                                    />
                              : null}
					{imageNom3 != null ? 
                                    <Image      
                                    style={styles.OfferImg}
                                    source={{ uri : global.MyVar+'/images/'+imageNom3[0]+'_'+post._id.$oid+'.'+imageNom3[1]}}
                                    />
                              : null}
                              {imageNom4 != null ? 
                                    <Image      
                                    style={styles.OfferImg}
                                    source={{ uri : global.MyVar+'/images/'+imageNom4[0]+'_'+post._id.$oid+'.'+imageNom4[1]}}
                                    />
                              : null}
                              {imageNom5 != null ? 
                                    <Image      
                                    style={styles.OfferImg}
                                    source={{ uri : global.MyVar+'/images/'+imageNom5[0]+'_'+post._id.$oid+'.'+imageNom5[1]}}
                                    />
                              : null}
					
				</View>

				<View style={styles.offerInfo_Price}> 
					<Text style={styles.price_text} >{post.prix} Dhs/mois</Text>
                              {demande == false ? 
					<TouchableOpacity 
                              onPress={() => {
                                    setIscancel(false)
                                    setModalVisible(true)}}
                              style={styles.price_btt}>
						<Text style={styles.price_btt_text}>ORDER IT!</Text>
					</TouchableOpacity>
                              : 
                              <View style={styles.statusStyles}>
                                    <Text style={styles.status_text} >{demande.status}...</Text>
                                    <TouchableOpacity 
                                    onPress={() => {
                                          setIscancel(true)
                                          setModalVisible(true)}}
                                    style={styles.cancel_btt}>
                                           <Text style={styles.price_btt_text}>Cancel</Text>
                                    </TouchableOpacity>
                              </View>
                              }
				</View>
			</View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                    {isCancel == false ? 
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Your price :</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeText}
                          value={text}
                          placeholder="Optional"
                          keyboardType="numeric"
                        />
                        <View style={styles.bts}>
                              <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                              >
                               <Text style={styles.textStyle2}>Cancel</Text>
                              </Pressable>
                              <Pressable
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={() => sendRequest()}
                              >
                               <Text style={styles.textStyle}>Confirm</Text>
                              </Pressable>
                        </View>
                         
                      </View>: 
                      <View style={styles.modalView2}>
                            <Text style={styles.modalText}> Are you sure you want to 
                              cancel the request ?</Text>
                             <View style={styles.bts}> 
                             <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                              >
                               <Text style={styles.textStyle2}>Cancel</Text>
                              </Pressable>
                              <Pressable
                                style={[styles.button, styles.buttonConfirm2]}
                                onPress={() => DeletRequest()}
                              >
                               <Text style={styles.textStyle}>Confirm</Text>
                              </Pressable>
                              </View>
                      </View>
                    }

                    </View>
                  </Modal>
		</View>
		)}
            else{
            return (

                  <View>
                  </View>
            )
      }

}

const styles= StyleSheet.create({
      container: {
      	flex: 1
      },
      offerImg: {
      	flex: 1.3
      },
      offerInfo : {
      	flex: 1.5,
      	backgroundColor: 'white',
      	marginTop: -40,
      	borderTopLeftRadius: 50,
      	borderTopRightRadius: 50,
      	paddingLeft: 30,
      	

      },
      offerInfo_title: {
      	marginTop: 30,
      	flex: 0.6,
      	flexDirection: 'row', 
      	justifyContent: 'space-around' ,
      	
      	paddingRight: 40
      },
      title_Text : {
      	fontSize: 20
      },
      title_Img : {
      	width: 23,
      	height: 23,
      	marginTop: 5
      } ,
      offerInfo_Content: {
      	flex: 1.5
      },
      offerInfo_Pictuers: {
      	flex: 1
      },
      offerInfo_Price: {
      	flex: 1,
      	flexDirection: 'row',
      	alignItems: 'center', 
      	justifyContent:  'space-around'  
      },
      content : {
      	flexDirection: 'row',
      	alignItems: 'center',
      	marginBottom: 20
      },
      billIcon: {
      	width: 40,
      	height: 40,
      	marginRight: 15
      },
      billText : {
      	color: "#6A6464",
      	fontWeight: 'bold',
      	fontSize: 15
      },
      offerInfo_Pictuers : {
      	flexDirection: 'row',
      },
      OfferImg : {
      	height: 80,
      	width: 80,
      	marginRight: 15
      },
      price_text: {
      	color: '#5044A3',
      	fontSize: 18,
      	fontWeight: 'bold'
      },
      price_btt: {
      	backgroundColor: '#5044A3',
      	padding: 15,
      	paddingRight: 20,
      	paddingLeft: 20,
      	borderRadius: 60
      },
      price_btt_text : {
      	color: 'white',
      	fontSize: 17
      },
      statusStyles: {
            flexDirection: 'row' ,
            alignItems:  'center' 
      },
      cancel_btt: {
            backgroundColor: 'red',
            padding: 8,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 3,
            marginLeft: 15
      },
      status_text: {
            borderWidth: 2,
            borderColor: '#6A6464',
            padding: 8,
            borderRadius: 3
      },
      centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          
        },
      modalView: {
          width: 300,
          height: 200,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "flex-start",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        modalView2: {
          width: 300,
          height: 150,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          alignItems: "center",
          justifyContent: 'center', 
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          borderRadius: 3,
          padding: 5,
          elevation: 2
        },
        
        buttonClose: {
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: '#2196F3',
          marginRight: 15
        },
        buttonConfirm: {
            backgroundColor: "#2196F3",
        },
        buttonConfirm2: {
            backgroundColor: "red",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        textStyle2: {
          color: "#2196F3",
          fontWeight: "bold",
          textAlign: "center"
        },

        modalText: {
          marginBottom: 15,
          textAlign: "center"
        },
        input: {
          height: 40,
          width: 230,
          marginBottom: 25,
          borderWidth: 0.9,
          padding: 8
       },
       bts: {
            flexDirection: 'row',
            marginLeft: 85
       }    

  })

const mapStateToProps = (state) => {
    return {
      user: state.UserReducer.User,
      favoritePosts: state.GetOffers.Favs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setFav: (data) => dispatch(setFavorite(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OfferDetails)
 