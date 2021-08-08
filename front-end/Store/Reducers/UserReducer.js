
import {GET_USER} from '../Acions/types'
import {SET_USER} from '../Acions/types'

const initState = {
	Offers : [],
	User: {},
	Favs: []
}

 const UserReducer = (state=initState, action) => {

 	let nextState

 	 switch(action.type){
 	 	case GET_USER :
 	 		
 	 		return state;

 	 	case SET_USER :
 	 		console.log('Userreducer')
 	 		console.log("test3")
 	 		return {
 	 			...state,
 	 			User: action.value
 	 		}
 	 		
 	 	default: return state;
 	 }

 }

 export default UserReducer