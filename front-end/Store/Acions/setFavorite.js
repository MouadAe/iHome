import {SET_FAV} from './types'
import {URL} from './types'

export const setFavorite = (data) => {
	console.log("testFav")
	return (dispatch,setState, axios) => {
	
		dispatch(setFavAction(data))
	}
}


const setFavAction= (data) => {
	console.log("testFav2")
	return {type: SET_FAV, value: data}
	
}