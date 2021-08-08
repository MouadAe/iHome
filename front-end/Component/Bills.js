import React ,{useState, useEffect}from 'react'
import {StyleSheet, View, Text,FlatList ,Image,Pressable, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements'
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import {connect} from 'react-redux'
import Axios from 'axios'

const GeneratePdf = async (html) => {

        try {
            const { uri } = await Print.printToFileAsync({ html });
            console.log(uri);
            console.log(html)
            const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            

            
               const asset= await MediaLibrary.createAssetAsync(uri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                  await MediaLibrary.createAlbumAsync('Download',asset, false);
                } else {
                  await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                  alert('Un pdf contenant les informations a été télecharger dans download');
                }
        
            
           
        } catch (err) {
            console.error(err);
        }
    };



const Bills = (props) => {
   

    const [modalVisible, setModalVisible] = useState(false);
    const [vari, setvari] = useState({name:'',
                                      adresse:'',
                                      type:''})
    const [people,setPeople]=useState([]);

        useEffect(() => {
            Axios.get(global.MyVar+"/GetBills/"+props.user.email)
                  .then( res => {
                        console.log(res.data.bills)
                        setPeople(res.data.bills)
                  })
                  .catch(err => {
                        console.log(err)
                  })
      
      
         },[])

        const sendData = (dataReq) => {
            console.log(dataReq)

            let data = {
                id : dataReq._id.$oid,
            }

            Axios.post(global.MyVar+"/UpdateBill",data)
            .then( res => {
                    console.log(res.data)
                    
            })
            .catch(err => {
                    console.log(err)
            })
        }

        function changeType2(params2){
            setModalVisible(!modalVisible);
            setvari(params2);
        }
        function changeType(params) {
            setPeople([...people].map(object => {
                if(object.name === params.name) {
                    
                  return {
                    ...object,
                   
                    type :'payé',
                  }
                }
                else return object;
              }))
            
            const   htmlContent=` <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pdf Content</title>
                <style>
                    body {
                        font-size: 16px;
                       
                    }
            
                    h1 {
                        text-align: center;
                        color: rgb(80, 68, 163);
                    }
                </style>
            </head>
            <body>
                    
            <h1>${params.name}</h1>
            <p><strong>Adresse : </strong>${params.adresse}</p>
            </body>
            </html>`;
            
            GeneratePdf(htmlContent)
            
            if(params.type!=='payé')
            setModalVisible(!modalVisible);
            
        }
        
    return (
        <View style={styles.container}>
            
            <Text style={styles.Title}>Your Bills !</Text>
            <Modal isVisible={modalVisible} 
            coverScreen = {false}
            style = {styles.modal}
            onBackdropPress={() => setModalVisible(false)}
            animationType={"slide"}
            transparent
            >
            <View style={styles.modalView}>
            <Text>Vous voulez confirmer le payement ?</Text>
            <Pressable style={styles.ButtonModal} onPress={()=>{
                    
                sendData(vari)
                changeType(vari)}}>
                     <Text style={styles.ButtonModalText}>confirmer</Text>
            </Pressable>

        </View>
      </Modal>
         <FlatList
         
         data={people}
         renderItem={({item})=>(
            <View style={styles.item}>
                <View style={styles.item2}> 
                <Image
                 source = {require("../assets/iconBills.png")}
                style={styles.icon}
                />
                    <Text  style={styles.text1} key={item.key}>{item.name}</Text>
                    
                </View>
            
  
{item.type=='Non Payé' ? <Pressable style={styles.Button} onPress={()=>{
                                                                        changeType2(item)
                                                                       // console.log(item)
                                                                    }}>
                     <Text style={styles.ButtonText}>Pay</Text>
                    </Pressable>:<View style={styles.item3}>
                    <TouchableOpacity  onPress={()=>changeType(item)}>
                         
                        <Image
                        source = {require("../assets/pdf.png")}
                        style={styles.icon2}
                   
                        />  
                    </TouchableOpacity>
                    <Button title="Payed" type="outline"  disabled/>
                    </View>
                  }
                   
            </View>
            
         )}
         keyExtractor={(item, index) => index.toString()}
         
         />
            
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: '#ffff',
      flexDirection : 'column',
      alignItems: 'stretch',
      padding : 10
    },
    item : {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        padding:20,
        backgroundColor:'#F3F2F9',
        fontSize:24,
        
        // borderRadius: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    item2 : {
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#F3F2F9',
        fontSize:24,
    },
    icon:{
        width:30,
        height:45
    },
    text1 :{
        flexDirection:'column',
        marginLeft:10,
        marginTop:10,
        alignItems: 'center',
        justifyContent :'center',
        fontSize: 19,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#5044A3',
    },
    Button:{
    backgroundColor: "#5044A3",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
     
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    },
    ButtonText:{
        fontSize: 15,
        paddingHorizontal:6.5,
        // lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    Title :{
        marginTop: 20,
        marginBottom: 25,
        fontSize: 27,
        color:"#5044A3",
        fontWeight: 'bold',
        textAlign:'center'
    },
    item3:{
        flexDirection:'row',
        
        // justifyContent:'space-around',
        backgroundColor:'#F3F2F9',
        fontSize:24,
    },
    icon2:{
        width:25,
        height:30,
        marginRight:5,
        marginTop:5
    },
    modal:{
    flex:1,
    // flexDirection:'column',
    height:'50%',
    // width:70,
    alignItems:'center',
    justifyContent: 'center',
    // marginTop: 200,
    // marginBottom:200,
 

    // backgroundColor: "white",
    borderRadius: 20,
    padding: 15,

   
    },
    modalView:{
        
        height: '45%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    
     
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      ButtonModal:{
        backgroundColor: "#5044A3",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        // borderRadius: 4,
        marginTop:20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      ButtonModalText :{
        
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }

})


const mapStateToProps = (state) => {
    return {
      user: state.UserReducer.User,
      
    }
 }
 
export default connect(mapStateToProps)(Bills)

