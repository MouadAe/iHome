import {SET_OFFERS} from './types'
import {URL} from './types'

export const SetOffer = () => {

	return (dispatch,setState, axios) => {
	
		
		axios.get(URL+'/Getposts')
		.then( res => {
			dispatch(SetOffersAction(res.data))
		})
		.catch(err => {

		})
	}
}


const SetOffersAction= (data) => {
	
	return {type: SET_OFFERS, value: data}
	
}