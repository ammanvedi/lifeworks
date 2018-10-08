import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button Component', function() {

    let container;
    let buttonClick;

    beforeEach( () => {

        buttonClick = jest.fn( () => {} );

        container = shallow(<Button modifier="test" name="myButton" onClick={ buttonClick } />);
    } )

    it( 'should display its name', () => {
        expect( container.text() ).toEqual( 'myButton' );
    } );

    it( 'should set the class modifier', () => {
        expect( container.hasClass( 'button--test' ) ).toBe( true );
    } );

    it( 'should invoke callback when button clicked', () => {
        container.simulate( 'click' );
        expect(buttonClick.mock.calls.length).toBe(1);
    } );

});
