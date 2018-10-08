import { BALANCE_URL } from '../../constants';
import { BalanceFetchError } from '../../error/balance-fetch-error';
import { getLowestDenominationValue } from '../../util';

/**
 * @typedef {Object} BalanceData
 * @property {string} currency the currency of the user wallet
 * @property {number} balance the current balance
 * @property {string} name the display name of this balance 
 */

export const BALANCE_ACTIONS = {
    FETCHING_BALANCE: 'actions/balance/fetching',
    FETCHING_BALANCE_FAILURE: 'actions/balance/fetching/fail',
    UPDATE_BALANCE: 'actions/balance/update'
};

export function fetchingBalance( fetching ) {
    return {
        type: BALANCE_ACTIONS.FETCHING_BALANCE,
        fetching
    }
}

export function fetchBalanceSuccess( success = true ) {
    return {
        type: BALANCE_ACTIONS.FETCHING_BALANCE_FAILURE,
        success
    }
}

/**
 * Update the balance in the redux state
 * 
 * @param {BalanceData} balanceData the balance data to update the state with
 * @returns {Object} the update balance action
 */
export function updateBalance( balanceData = {} ) {
    return {
        type: BALANCE_ACTIONS.UPDATE_BALANCE,
        balanceData: {
            ...balanceData
        }
    }
}

export function fetchBalance() {

    return function( dispatch, getState ) {

        if ( getState().balance.fetching ) {
            // we are already fetching this info, dont fetch again
            return;
        }

        dispatch( fetchingBalance( true ) );

        return fetch( BALANCE_URL )
            .then( response => {
                if( !response.ok ) {
                    throw new BalanceFetchError( `could not fetch balance, status ${ respone.status }`, BALANCE_URL );
                }

                return response.json()
            } )
            .then( data => {
                dispatch( updateBalance( {
                    ...data,
                    // data returned from api is in pounds and pence.
                    // we dont want to be doing floating point math in JS 
                    // so lets just deal with pence, cents etc
                    balance: getLowestDenominationValue( data.balance )
                } ) );
                dispatch( fetchBalanceSuccess( true ) );
            } )
            .catch( err => {
                // something went wrong either in the response code or with the request
                console.warn( err );
                dispatch( fetchBalanceSuccess( false ) );
            } )
            .finally( () => {
                dispatch( fetchingBalance( false ) );
            } )

    }
}