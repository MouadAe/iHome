import {SET_USER} from './types'
import {URL} from './types'

export const setUser = (data) => {
	console.log("test1User")
	return (dispatch,setState, axios) => {
	
		dispatch(setUserAction(data))
	}
}


const setUserAction= (data) => {
	console.log("test2User")
	return {type: SET_USER, value: data}
	
}