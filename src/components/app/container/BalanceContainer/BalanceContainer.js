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
        this.props.fetchBalance();
    }

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

    getNewBalance( balanceDelta, currentBalance ) {
        const changeInBalance = getLowestDenominationValue( balanceDelta );
        const newBalance = currentBalance + changeInBalance;

        return newBalance;
    }

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
