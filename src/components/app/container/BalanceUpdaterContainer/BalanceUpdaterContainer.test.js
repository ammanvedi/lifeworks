import React from 'react';
import { shallow } from 'enzyme';
import BalanceUpdaterContainer from './BalanceUpdaterContainer';
import { UI_STRINGS } from '../../../constants';

describe('Balance Container', function() {

    let container;
    let onUpdate;

    beforeEach( () => {
        onUpdate = jest.fn( () => {} );
        container = shallow(<BalanceUpdaterContainer onValueUpdate={ onUpdate } />)
    } )

    it( 'should not fire callback if number invalid - non zero', () => {
        const inputContainer = container.dive();
        inputContainer.find( '.js-balance-input' ).simulate('change', { target: { value: 0.001 } });
        inputContainer.find( '.js-button-increment' ).simulate( 'click' );
        expect( onUpdate.mock.calls.length ).toBe( 0 );
    } );

    it( 'should not fire callback if number invalid - 0.00', () => {
        const inputContainer = container.dive();
        inputContainer.find( '.js-balance-input' ).simulate('change', { target: { value: 0.00 } });
        inputContainer.find( '.js-button-increment' ).simulate( 'click' );
        expect( onUpdate.mock.calls.length ).toBe( 0 );
    } );

    it( 'should not fire callback if number invalid - 0', () => {
        const inputContainer = container.dive();
        inputContainer.find( '.js-balance-input' ).simulate('change', { target: { value: 0 } });
        inputContainer.find( '.js-button-increment' ).simulate( 'click' );
        expect( onUpdate.mock.calls.length ).toBe( 0 );
    } );

    it( 'should fire callback if number valid', () => {
        const inputContainer = container.dive();
        inputContainer.find( '.js-balance-input' ).simulate('change', { target: { value: 0.01 } });
        inputContainer.find( '.js-button-increment' ).simulate( 'click' );
        expect( onUpdate.mock.calls.length ).toBe( 1 );
    } );
});


