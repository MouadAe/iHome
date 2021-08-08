import React,{useState,useEffect} from "react"
import {View} from 'react-native';
import Offeritem from "./OfferItem"
import {SetOffer} from '../Store/Acions/SetOffers'
import {connect} from 'react-redux'
import Offers from './Offers'
import MyDrawer from './Routes/Drawer';


function Main (props){


	useEffect(() => {
    	props.setOffers()
  	})
	   

	return(
  	 <MyDrawer />
		);
 
}
 



 

export default Main