import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet,Image,ScrollView,Pressable,FlatList } from 'react-native'
import {connect} from 'react-redux'

function editPostPage({navigation,Offers, user}){
   let posts=Offers.filter((item) => item.owner==user.email)
   useEffect(() => {
      console.log("im in comp")
      posts=Offers.filter((item) => item.owner==user.email)
   })
   
   
   return (
      <ScrollView style={styles.container}>
         <Text style={styles.title}>Edit your posts now !</Text>
         <FlatList numColumns={2} data={posts} renderItem = { ({item}) =>{
            let imageNom=item.image1.split('.')
            return (
            <Pressable
             style={styles.imageContainer}
             onPress ={ () => {
               let id=item._id.$oid 
               navigation.navigate('Edit Post',{id})
            }}  
            >
               <Image
                  source={{uri:global.MyVar+'/images/'+imageNom[0]+'_'+item._id.$oid+'.'+imageNom[1]}} 
                  style={styles.image}
               />
               <Text style={styles.imageDescription}>
                  {item.title}
               </Text>
            </Pressable>
            )}
         } />
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
  imageContainer:{
      marginVertical :30,
      marginHorizontal: 20,
      borderWidth : 1,
      borderColor : "#000",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
  },
  image: {
     width: 160,
     height : 160
  },
  imageDescription:{
     fontSize: 11,
     textAlign: 'center',
     marginVertical:15,
     width:160,
   //   justifyContent:'center'
  }

})

const mapStateToProps = (state) => {
   console.log('im Owner Home POsts')
  console.log(state.GetOffers.Offers)
  return  {
    Offers: state.GetOffers.Offers,
    user: state.UserReducer.User,
  }
} 
export default connect(mapStateToProps)(editPostPage)
