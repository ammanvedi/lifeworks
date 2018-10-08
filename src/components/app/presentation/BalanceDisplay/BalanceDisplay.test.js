import React from 'react';
import { shallow } from 'enzyme';
import BalanceDisplay from './BalanceDisplay';
import { UI_STRINGS } from '../../../constants';

describe('Balance Display Presentation Component', function() {

    const balanceTitle = "Balance Title";
    const negativeBalance = -590;

    it( 'should display balance title correctly', () => {
        const container = shallow(<BalanceDisplay name={ balanceTitle } currency="£" balance="" />);
        expect( container.find( '.js-balance-name' ).text() ).toEqual( balanceTitle );
    } );

    it( 'should display empty balance when data is not available', () => {
        const container = shallow(<BalanceDisplay name={ balanceTitle } currency="£" balance="" />);
        expect( container.find( '.js-balance-value' ).text() ).toEqual( '-.--' );
    } );

    it( 'should display a positive value in the correct format', () => {
        const balance = 590;
        const container = shallow(<BalanceDisplay name={ balanceTitle } currency="£" balance={ balance } />);
        expect( container.find( '.js-balance-value' ).text() ).toEqual( '£5.90' );
    } );

    it( 'should display a positive value in the correct format', () => {
        const container = shallow(<BalanceDisplay name={ balanceTitle } currency="£" balance={ negativeBalance } />);
        expect( container.find( '.js-balance-value' ).text() ).toEqual( '-£5.90' );
    } );

    it( 'should display a message when belance is negative', () => {
        const container = shallow(<BalanceDisplay name={ balanceTitle } currency="£" balance={ negativeBalance } />);
        expect( container.find( '.js-balance-message' ).text() ).toEqual( UI_STRINGS.BALANCE_NEGATIVE );
    } );

});
