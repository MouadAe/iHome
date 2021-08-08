import {ADD_POST} from './types'
import {URL} from './types'

export const AddPost = (data) => {
	console.log("testADD")
	return (dispatch,setState, axios) => {
	
		dispatch(AddAction(data))
	}
}


const AddAction= (data) => {
	console.log("testADD2")
	return {type: ADD_POST, value: data}
	
}