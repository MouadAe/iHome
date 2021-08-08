import React,{useState,useEffect} from "react"
import {Image,ActivityIndicator,StyleSheet,Text,TextInput,View,Button,TouchableOpacity,FlatList} from 'react-native';
import Offeritem from "./OfferItem"
import {SetOffer} from '../Store/Acions/SetOffers'
import {Provider,connect} from 'react-redux'


function Offers (props){
	let data=[{id:1}, {id:2}]


	const showDetails = (id) => {
 		
 		props.navigation('OfferDetails',{id})
 	}

	return(
	<View style={styles.container}> 

		<View style={styles.header}> 
			<TouchableOpacity style={styles.header_filter} > 
				<Image style={styles.filterImg} 
					   source= {require('../images/filter2.png')}
				/>
				<Text style={styles.header_filter_text}> Filter</Text>
			</TouchableOpacity>
		</View>

		<View style={styles.title}> 
			<Text style={styles.title_text}>Let’s find </Text>
				<Text style={styles.title_text}>you a house quickly ! </Text>
		</View>

		<View style={styles.body}> 
			<FlatList 
				keyExtractor={(item) => item._id.$oid.toString()}
				data={props.Offers} 
				
				renderItem={({item})=> {
					let favorite=false
                              if(props.favoritePost.findIndex((p) => p._id.$oid === item._id.$oid) !== -1) {
                                    favorite=true
                              }
					return (
						<Offeritem isFavorite={favorite} offer={item} showDetails={showDetails} />
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
      header : {
      	flex: 1,
      	alignItems: 'flex-end'
      },
      header_filter: {
      	backgroundColor: '#E4DDBE',
      	flexDirection: 'row' ,
      	borderRadius: 16,
      	padding: 6,
      	paddingLeft:  10,
      	paddingRight:  10,
		marginTop : 10

      },
      header_filter_text: {
      	fontSize: 15,
      	color: '#5044A3'
      },
      title: {

      	flex: 2,
		paddingLeft: 13
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
	  //console.log(state)
    return state != undefined ? {
      Offers: state.GetOffers.Offers,
      favoritePost: state.GetOffers.Favs
    }: {
      Offers: [],
      favoritePost: []
    }
}
 

export default connect(mapStateToProps)(Offers)