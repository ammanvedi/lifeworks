import { createStore, combineReducers, applyMiddleware } from 'redux';
import { balanceReducer } from '../reducers/balance-reducers';
import thunk from 'redux-thunk';


export const store = createStore(
    combineReducers( {
        balance: balanceReducer
    } ),
    applyMiddleware(thunk)
) 