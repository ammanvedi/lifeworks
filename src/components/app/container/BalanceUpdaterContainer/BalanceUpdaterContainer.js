import React from 'react';
import BalanceUpdater from '../../presentation/BalanceUpdater/BalanceUpdater';

import { UI_STRINGS, VALID_INPUT_REGEX } from '../../../constants';

/**
 * BalanceUpdater container is a container component that wraps the BalanceUpdater. It will 
 * handle any validation logic of the child input
 */
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

    /**
     * When the number changes we store it in the component state and also keep track of wether it
     * is valid or not
     * 
     * @param {SyntheticEvent} changeEvent the change event from the input
     */
    numberChanged( changeEvent ) {

        let newValue = changeEvent.target.value;
        let parsed = parseFloat( newValue );

        // value must be in correct format and be non 0
        if( !VALID_INPUT_REGEX.test( changeEvent.target.value ) || parsed === 0 ) {
            this.setValidity( false );
        } else {
            newValue = parsed;
            this.setValidity( true );
        }

        this.setState( state => {
            return {
                ...state,
                inputValue: newValue
            }
        } );
    }

    /**
     * if the input is valid invoke the callback with the value
     */
    incrementClicked() {
        if( !this.state.inputValid ) {
            return;
        }
        this.props.onValueUpdate( this.state.inputValue );
    }

    /**
     * If the input is invalid invoke the valid update callback with a negative value
     */
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