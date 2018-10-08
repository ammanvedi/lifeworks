import React from 'react';
import { connect } from 'react-redux';
import { updateBalance, fetchBalance } from '../../../data/actions/balance-actions';
import { getLowestDenominationValue, formatCurrency } from '../../../util';

import BalanceDisplay from '../../presentation/BalanceDisplay/BalanceDisplay';
import BalanceUpdaterContainer from '../BalanceUpdaterContainer/BalanceUpdaterContainer';
import BalanceDeltaDisplay from '../../presentation/BalanceDeltaDisplay/BalanceDeltaDisplay';

import { UI_STRINGS } from '../../../constants';

import styles from './BalanceContainer.scss';

class BalanceContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balanceDeltas: []
        }
    }

    componentDidMount() {
        // dispatch redux action to fetch balance data
        this.props.fetchBalance();
    }

    /**
     * Depending on the change in the balance get the string that should be shown in the transaction listing
     * 
     * @param {number} delta the change in the balance
     * @return {string} the balance transaction explanation
     */
    getTransactionMessage( delta ) {

        const currencyString = formatCurrency( Math.abs( delta ), this.props.currency );
        if( delta > 0 ) {
            return `Increase by ${ currencyString }`;
        }

        if ( delta < 0 ) {
            return `Decrease by ${ currencyString }`;
        }

        return `Initial amount`;
    }

    /**
     * Add a new transaction to the state
     * 
     * @param {number} newbalance the updated balance in the wallet
     * @param {number} changeInBalance the amount the balance has been incremeneted or decremented y
     */
    addBalanceTransaction( newBalance, changeInBalance ) {

        this.setState( state => {
            return {
                ...state,
                balanceDeltas: [ {
                    finalBalance: formatCurrency( newBalance, this.props.currency ),
                    message: this.getTransactionMessage( changeInBalance )
                }, ...state.balanceDeltas ]
            }
        } );
    }

    /**
     * Apply a change in balance and return the new value in lowest denomination
     * 
     * @param {number} balanceDelta change in balance as a decimal
     * @param {number} currentBalance current balance in lowest deonimation e.g. pence
     */
    getNewBalance( balanceDelta, currentBalance ) {
        const changeInBalance = getLowestDenominationValue( balanceDelta );
        const newBalance = currentBalance + changeInBalance;

        return newBalance;
    }

    /**
     * Callback invoked by the child BalanceUpdaterContainer when the value of the input is valid
     * and the user has clicked a button.
     * 
     * @param {number} balanceDelta change in balance as a decimal
     */
    onValueUpdate( balanceDelta ) {
        const newBalance = this.getNewBalance( balanceDelta, this.props.balance );

        if ( this.state.balanceDeltas.length === 0 ) {
            // add the initial balance entry
            this.addBalanceTransaction( this.props.balance, 0 );
        }

        this.props.updateBalance( newBalance );

        this.addBalanceTransaction( newBalance, getLowestDenominationValue( balanceDelta ) );
    }

    render() {
        return (
            <div className={ `${ styles.balanceContainer } ${ this.props.loading ? styles[ 'balanceContainer--loading' ]: '' }` } >
                <div className={ styles.balanceContainer__content }>
                    <div className={ styles.balanceContainer__top }>
                        <h1 className={ styles.balanceContainer__heading }>{ UI_STRINGS.WALLET }</h1>
                        <div className={ styles.balanceContainer__controls }>
                            <BalanceDisplay balance={ this.props.balance } currency={ this.props.currency } name={ this.props.name } />
                            <BalanceUpdaterContainer onValueUpdate={ this.onValueUpdate.bind( this ) } />
                        </div>
                    </div>
                    <BalanceDeltaDisplay deltas={ this.state.balanceDeltas } />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.balance.fetching,
        successLoading: state.balance.success,
        currency: state.balance.data.currency,
        balance: state.balance.data.balance,
        name: state.balance.data.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBalance: newBalance => {
            dispatch( updateBalance( {
                balance: newBalance
            } ) )
        },
        fetchBalance: () => dispatch( fetchBalance() )
    }
}

const BalanceContainerConnected = connect( mapStateToProps, mapDispatchToProps )( BalanceContainer );

export default BalanceContainerConnected;
