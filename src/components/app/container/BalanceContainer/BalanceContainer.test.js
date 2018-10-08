import React from 'react';
import { shallow } from 'enzyme';
import BalanceContainer from './BalanceContainer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const promiseFinally = require('promise.prototype.finally');

describe('Balance Container', function() {

    promiseFinally.shim();

    let container;
    let mockStore;

    global.fetch = () => {
        return Promise.resolve( {
            ok: true,
            json: () => {
                return {}
            }
        } )
    }
    
    const storeInitialState = {
        balance: {
            fetching: false,
            success: true,
            data: {
                balance: 1200,
                currency: '£',
                name: 'This is the title'
            }
        }
    };

    const store = configureStore([ thunk ]);

    beforeEach( () => {
        mockStore = store( storeInitialState );
        container = shallow(<BalanceContainer store={ mockStore } />)
    } )

    it( 'should increment value correctly', () => {
        const balance = container.dive().instance().getNewBalance( 10.83, 1200 );
        expect( balance ).toEqual( 2283 );
    } );
    
    it( 'should decrement value correctly', () => {
        const balance = container.dive().instance().getNewBalance( -10.83, 1200 );
        expect( balance ).toEqual( 117 );
    } );

    it( 'should generate correct increase transaction message', () => {
        const message = container.dive().instance().getTransactionMessage( 1083 );
        expect( message ).toEqual( 'Increase by £10.83' );
    } );

    it( 'should generate correct decrease transaction message', () => {
        const message = container.dive().instance().getTransactionMessage( -1083 );
        expect( message ).toEqual( 'Decrease by £10.83' );
    } );

    it( 'should generate correct initial transaction message', () => {
        const message = container.dive().instance().getTransactionMessage( 0 );
        expect( message ).toEqual( 'Initial amount' );
    } );
});


