import { BALANCE_ACTIONS } from '../actions/balance-actions';

const DEFAULT_BALANCE_STATE = {
    success: false,
    fetching: false,
    data: {}
}

export function balanceReducer( state = DEFAULT_BALANCE_STATE, action ) {

    switch( action.type ) {
        case BALANCE_ACTIONS.FETCHING_BALANCE:
            return {
                ...state,
                fetching: action.fetching,
                // make sure we are not maintaining a reference to the old states' data object
                data: {
                    ...state.data
                }
            };
        case BALANCE_ACTIONS.FETCHING_BALANCE_FAILURE:
            return {
                ...state,
                success: false,
                data: {
                    ...state.data
                }
            };
        case BALANCE_ACTIONS.UPDATE_BALANCE:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.balanceData,
                    // store as lowest denomination to avoid issues with floats in js
                    balance: action.balanceData.balance * 100
                }
            }
        default:
            return {
                ...state,
                data: {
                    ...state.data
                }
            }
    }
}