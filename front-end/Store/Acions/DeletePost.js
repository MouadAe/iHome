import {DEL_POST} from './types'
import {URL} from './types'

export const DeletePost = (data) => {
	console.log("testDEl")
	return (dispatch,setState, axios) => {
	
		dispatch(DeleteAction(data))
	}
}


const DeleteAction= (data) => {
	console.log("testFav2")
	return {type: DEL_POST, value: data}
	
}