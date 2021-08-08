import React,{useState,useEffect} from "react"
import {View} from 'react-native';
import Offeritem from "./OfferItem"
import {SetOffer} from '../Store/Acions/SetOffers'
import {connect} from 'react-redux'
import Offers from './Offers'


function StartApp (props){


	useEffect(() => {
    	props.setOffers()
  	})
	   

	return(
  	<Offers navigation={props.navigation.navigate} /> 
		);
 
}
 



 
const mapDispatchToProps = (dispatch) => {
  return {
      setOffers: () => dispatch(SetOffer())
  }
}
export default connect(null,mapDispatchToProps)(StartApp)