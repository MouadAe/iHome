import React,{useState} from 'react'
import { View, Text ,StyleSheet,FlatList ,Image,Pressable} from 'react-native'
import Modal from 'react-native-modal';

const Month=['Janvier' ,
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
]
    


const FinancialSpace = () => {
    // const sortedActivities = activities.sort((a, b) => b.date - a.date)
    
    const [modalVisible, setModalVisible] = useState(false);
    const [financial, setfinancial] = useState([
        {
            namePub : 'Facture 1',
            
            date : new Date('2021-06-22'),
            somme : 30,
            type :'Unpaid' 
        },
        {
            namePub : 'Facture 5',
           
            date :  new Date('2021-06-21'),
            somme : 30,
            type :'Unpaid'
        }, 
        {
            namePub : 'Facture 2',
           
            date :  new Date('2021-05-21'),
            somme : 30,
            type :'Payed'
        }, 
        {
            namePub : 'Facture 3',
           
            date :  new Date('2021-04-19'),
            somme : 30,
            type :'Payed'
        },
        {
            namePub : 'Facture 4',
           
            date :  new Date('2021-04-19'),
            somme : 30,
            type :'Payed'
        }
    ]);
    
    const nouv =financial.sort((a, b) => b.date - a.date);
 
    const datecour = new Date();
    var array2 = [];
    var array3 =[];
    var somme =0;
    nouv.map(e=>{(e.date.getMonth()==datecour.getMonth()&&
        e.date.getFullYear()==datecour.getFullYear()&&e.type==='Unpaid') ?(array2.push(e),somme+=e.somme):array3.push(e);
    
    })
 
    function changePub() {
       
        array2[array2.length-1].type='Payed'
        alert('Votre facture a été bien payer');
        setModalVisible(!modalVisible);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Owner Financial Space</Text>
            <Modal isVisible={modalVisible} 
            coverScreen = {false}
            style = {styles.modal}
            onBackdropPress={() => setModalVisible(false)}
            animationType={"slide"}
            transparent
            >
            <View style={styles.modalView}>
            <Text>Vous voulez confirmer le payement ?</Text>
            <Pressable style={styles.ButtonModal}  onPress={()=>changePub()}>
                     <Text style={styles.ButtonModalText}>confirmer</Text>
            </Pressable>

        </View>
      </Modal>
            <View style={{ flex: 1 }}> 
            <Text style={styles.Title2}>--- Factures ---</Text>
            <FlatList
            data={array2}
            renderItem={({item})=>(
                <View style={styles.item}>
                <View style={styles.item3}>
                    <View > 
                    <Image
                     source = {require("../assets/Owner.png")}
                    style={styles.image}
                />
                </View>
                <View style={styles.item2}>
                    <Text style={styles.Title2}>{item.namePub}</Text>
                    <Text style={styles.date}>{ Month[item.date.getMonth()] +' '+item.date.getDate()+','+item.date.getFullYear()}</Text>
                    {/* <Text>{item.date}</Text> */}
                </View>
                </View>
                
                <View style={styles.item4}>
                    <Text style={styles.somme}>{item.type}</Text>

                </View>
                
                </View>
                
             )}
             keyExtractor={(item, index) => index.toString()}
            
            
            /></View>
           <View style={{ flex: 2 }}> 
            <Text style={styles.Title2}>--- Historique ---</Text>
             <FlatList
            data={array3}
            renderItem={({item})=>(
                <View style={styles.item}>
                <View style={styles.item3}>
                    <View > 
                    <Image
                     source = {require("../assets/Owner.png")}
                    style={styles.image}
                />
                </View>
                <View style={styles.item2}>
                    <Text style={styles.Title2}>{item.namePub}</Text>
                    <Text style={styles.date}>{ Month[item.date.getMonth()] +' '+item.date.getDate()+','+item.date.getFullYear()}</Text>
                    {/* <Text>{item.date}</Text> */}
                </View>
                </View>
                
                <View style={styles.item4}>
                    <Text style={styles.somme}>{item.type}</Text>

                </View>
                
                </View>
                
             )}
             keyExtractor={(item, index) => index.toString()}
             
            
            /></View>
           
            <View style={{ flex: 1,flexDirection:'column' }}>
                <View  style={{ borderBottomWidth:1,borderTopWidth:1,marginTop:10,backgroundColor:'#E4DDBE' ,borderColor:'#5044A3'}}> 
                    <Text style={{textAlign:'center',color:'#5044A3',fontWeight: 'bold'}}> {'Your Balance : '+somme+' MAD'}</Text>
                </View>
                <View  style={{ borderBottomWidth:1,borderTopWidth:1,marginTop:5,backgroundColor:'#E4DDBE' ,borderColor:'#5044A3'}}> 
                    <Text style={{textAlign:'center',color:'#5044A3',fontWeight: 'bold'}}>You must pay the bill every 15 days </Text>
                </View>
            {/* <Pressable style={styles.ButtonModal} onPress={()=>changeType(vari)}>
                     <Text style={styles.ButtonModalText}>confirmer</Text>
            </Pressable> */}
            <View style={{ flexDirection:'row',  alignItems: 'center',  justifyContent: 'center'}}>  
            <Pressable style={styles.button} onPress={()=>setModalVisible(!modalVisible)}>
            <Text style={styles.text}>Payer</Text>
            </Pressable>
            </View>
           
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#ffff',
        flexDirection : 'column',
        alignItems: 'stretch',
        padding : 10
      },
      Title :{
        textAlign:'center',
        marginTop: 10,
        marginBottom: 25,
        fontSize: 27,
        color:"#5044A3",
        fontWeight: 'bold',  
    },
  Title2 :{
        textAlign:'center',
        // marginTop: 20,
        marginBottom: 10,
        fontSize: 15,
        color:"#5044A3",
        fontWeight: 'bold',
        
        
    },
    item : {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        padding:15,
        // backgroundColor:'#F3F2F9',
        fontSize:24,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    item2:{
        flexDirection:'column',
        justifyContent:'space-around',
        marginLeft :10,
        // backgroundColor:'#ffff'

    },
    item3:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    item4:{

        flexDirection:'column-reverse'
    },
    image :{
        width:60,
        height:60
    },
    date :{
        // textAlign:'center',
        // marginTop: 20,
        // marginBottom: 25,
        fontSize: 10,
        color:"#8E7D7D",
        fontWeight: 'bold',
    },
    somme:{
        marginBottom: 5,
        fontSize: 15,
        color:"#5044A3",
        fontWeight: 'bold',
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        // paddingHorizontal: 32,
        width :'70%',
        borderRadius: 4,
        borderWidth:1,
        borderColor:'green',
        elevation: 3,
        marginTop:10
        // backgroundColor: 'black',
      },
      text: {
        
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'green',
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

export default FinancialSpace
