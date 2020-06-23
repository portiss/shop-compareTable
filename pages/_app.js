import { combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { appWithRedux } from 'next-redux'
import products from '../reducers/products'
const reducer = combineReducers({products})

/* Redux connection to products reducer and thunk usage*/
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default appWithRedux(reducer, enhancer)
