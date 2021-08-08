import {createStore,combineReducers,applyMiddleware} from 'redux'
import GetOffers from './Reducers/OfferReducer'
import UserReducer from './Reducers/UserReducer'
import axios from 'axios'
import thunk from 'redux-thunk'


export default createStore(combineReducers({GetOffers,UserReducer}),applyMiddleware(thunk.withExtraArgument(axios)))
