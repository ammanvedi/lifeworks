import React from 'react';
import BalanceUpdater from '../../presentation/BalanceUpdater/BalanceUpdater';

import { UI_STRINGS, VALID_INPUT_REGEX } from '../../../constants';

export default class BalanceUpdaterContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            inputValue: 5,
            inputValid: true
        }
    }

    setValidity( validity ) {
        this.setState( state => {
            return {
                ...state,
                inputValid: validity
            }
        } )
    }

    setInputValue( inputValue ) {

    }

    numberChanged( changeEvent ) {
        let newValue = changeEvent.target.value;

        if( !VALID_INPUT_REGEX.test( changeEvent.target.value ) || newValue === '0' ) {
            this.setValidity( false );
        } else {
            newValue = parseFloat( newValue )
            this.setValidity( true );
        }

        this.setState( state => {
            return {
                ...state,
                inputValue: newValue
            }
        } );
    }

    incrementClicked() {
        if( !this.state.inputValid ) {
            return;
        }
        this.props.onValueUpdate( this.state.inputValue );
    }

    decrementClicked() {
        if( !this.state.inputValid ) {
            return;
        }
        this.props.onValueUpdate( -1 * this.state.inputValue );
    }

    render() {

        return (
            <BalanceUpdater inputValue={ this.state.inputValue }
                            numberChanged={ this.numberChanged.bind( this ) }
                            decrementClick={ this.decrementClicked.bind( this ) }
                            incrementClick={ this.incrementClicked.bind( this ) }
                            message={ this.state.inputValid ? '' : UI_STRINGS.UPDATE_ERROR }/>
        );
    }
}