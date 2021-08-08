import {SET_OFFERS} from '../Acions/types'
import {SET_FAV}  from '../Acions/types' 
import {DEL_POST}  from '../Acions/types'
import {ADD_POST} from '../Acions/types'

const initState = {
	Offers : [],
	User: {},
	Favs: []
}
 const GetOffers = (state=initState, action) => {

 	let nextState

 	 switch(action.type){

 	 	case 'GET_OFFERS' :
 	 		
 	    	return state;

 	 	case SET_OFFERS :
 	 		console.log('Offerreducer')
 	 		return {
 	 			...state,
 	 			Offers: action.value
 	 		}
 	 	case SET_FAV : 

 	 		let index=state.Favs.findIndex((item) => item._id.$oid === action.value._id.$oid)
 	 		if(index !== -1){
 	 			nextState={
 	 				...state,
 	 				Favs : state.Favs.filter((item,indexItem) => indexItem !== index)
 	 			}
 	 		}else{
 	 			nextState={
 	 				...state,
 	 				Favs : [...state.Favs,action.value]
 	 			}
 	 		}
 	 		return nextState || state;
		case DEL_POST : 
			  console.log("im in del reducer")
			  return {
				  ...state,
				  Offers: state.Offers.filter((item) => item._id.$oid !== action.value)
			  }
		case ADD_POST :
			console.log("im in ADD reducer",action.value)
			return {
				...state,
				Offers : [...state.Offers,action.value]
			}
 	 	default: return state;
 	 }

 }

 export default GetOffers