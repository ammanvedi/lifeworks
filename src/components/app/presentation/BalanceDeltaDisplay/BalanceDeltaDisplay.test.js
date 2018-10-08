import React from 'react';
import { shallow } from 'enzyme';
import BalanceDeltaDisplay from './BalanceDeltaDisplay';
import { UI_STRINGS } from '../../../constants';

describe('Balance Delta Display Presentation Component', function() {

    it( 'should render an empty message when there are no transactions', () => {
        const deltas = [];
        const container = shallow(<BalanceDeltaDisplay deltas={ deltas } />);
        expect( container.find( '.js-empty-message' ).text() ).toEqual( UI_STRINGS.TRANSACTIONS_NONE );
    } );

    it( 'should render a increment transaction in the correct format', () => {
        const deltasIncrease = [ {
            message: 'Increase by £1.20',
            finalBalance: '£12.00'
        } ];

        const container = shallow(<BalanceDeltaDisplay deltas={ deltasIncrease } />);
        expect( container.find( '.js-delta-title' ).text() ).toEqual( 'Increase by £1.20' );
        expect( container.find( '.js-delta-final-balance' ).text() ).toEqual( '£12.00' );
    } );

    it( 'should render a decrement transaction in the correct format', () => {
        const deltasDecrease = [ {
            message: 'Decrease by £1.20',
            finalBalance: '£12.00'
        } ];

        const container = shallow(<BalanceDeltaDisplay deltas={ deltasDecrease } />);
        expect( container.find( '.js-delta-title' ).text() ).toEqual( 'Decrease by £1.20' );
        expect( container.find( '.js-delta-final-balance' ).text() ).toEqual( '£12.00' );
    } );
});
