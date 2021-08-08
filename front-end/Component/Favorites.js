import React,{useState} from "react"
import {ActivityIndicator,StyleSheet,Text,TextInput,View,Button,Image,FlatList} from 'react-native';
import {connect} from 'react-redux'
import Offeritem from "./OfferItem"

function Favorites (props){

	const showDetails = (id) => {
 		
 		props.navigation.navigate('OfferDetails',{id})
 	}

	return(
	<View style={styles.container}> 

		<View style={styles.title}> 
			<Text style={styles.title_text}>Your favorites ! </Text>
		</View>

		<View style={styles.body}> 
			<FlatList 
				keyExtractor={(item) => item._id.$oid.toString()}
				data={props.favoritePosts} 
				
				renderItem={({item})=> {
					
					return (
						<Offeritem isFavorite={true} offer={item} showDetails={showDetails} />
					)
				}}	
				/>
		</View>	

	</View>

		);

}

const styles= StyleSheet.create({
      container: {
      	margin: 0,
      	marginRight:0,
      	marginTop:  0,
      	flex: 1,
		backgroundColor: 'white',
		paddingRight: 15
            
      },
    
      title: {

      	flex: 2,
		paddingLeft: 13,
		justifyContent:  'center'
      },
      title_text : {
      	fontSize: 26
      },
      body : {
      	flex: 7
      },
      filterImg : {
      	height: 18,
      	width: 18,
      	marginTop: 2
      }

  })

const mapStateToProps = (state) => {
    return {
 
      favoritePosts: state.GetOffers.Favs,
    }
}

export default connect(mapStateToProps)(Favorites)