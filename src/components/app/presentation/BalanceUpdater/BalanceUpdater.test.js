import React from 'react';
import { shallow } from 'enzyme';
import BalanceUpdater from './BalanceUpdater';
import { UI_STRINGS } from '../../../constants';

describe('Balance Updater Presentation Component', function() {

    let container;
    let incrementClick;
    let decrementClick;
    let numberChanged;

    beforeEach( () => {

        incrementClick = jest.fn( () => {} );
        decrementClick = jest.fn( () => {} );
        numberChanged = jest.fn( () => {} );

        container = shallow(<BalanceUpdater inputValue={ 0 }
            numberChanged={ numberChanged }
            decrementClick={ decrementClick }
            incrementClick={ incrementClick }
            message={ UI_STRINGS.UPDATE_ERROR }/>);
    } )

    it( 'should display an initial value', () => {
        expect( container.find( '.js-balance-input' ).props().value ).toEqual( 0 );
    } );

    it( 'should display a message', () => {
        expect( container.find( '.js-message' ).text() ).toBe( UI_STRINGS.UPDATE_ERROR );
    } );

    it( 'should invoke callback when input changed', () => {
        container.find( '.js-balance-input' ).simulate('change', { target: { value: 0.01 } });
        expect(numberChanged.mock.calls.length).toBe(1);
    } );

});
