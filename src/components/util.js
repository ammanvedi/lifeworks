import { LOWEST_DENOMINATION_MULTIPLIER, CURRENCY_MAP } from './constants';

/**
 * For a currecy value that is specified in for example, pounds and pence
 * get its value in its lowest donmination, e.g. cents, pence
 * 
 * @param {number} value the value to convert
 * @returns {number} the value in its lowest denomination
 */
export function getLowestDenominationValue( value ) {
    return value * LOWEST_DENOMINATION_MULTIPLIER;
}

/**
 * Take a number and properly format it into a currency
 * 
 * @param {number} [value=0] the currency amount, as an integer lowest denomination
 * @param {string} [symbol="£"] the currency symbol, this will be mapped to a currency code
 * 
 * @return {string} the formatted currency string
 */
export function formatCurrency( value = 0, symbol = '£'  ) {

    const currency = CURRENCY_MAP[ symbol ];
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency
    } )

    return formatter.format( value / LOWEST_DENOMINATION_MULTIPLIER );
}