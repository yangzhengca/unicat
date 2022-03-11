import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import './index.css'


// const store= createStore(reducers,compose(applyMiddleware(thunk)))


//Using Redux Dev Tool

// const initialState = {};
const middleware = [thunk];
const store = createStore(
   reducers,
 //   initialState,
   compose(
     applyMiddleware(...middleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
 );


ReactDOM.render(
    <Provider store={store}>
       <App /> 
    </Provider>,
    document.getElementById('root'))