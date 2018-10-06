import React from 'react';
import { connect } from 'react-redux';
import { updateBalance, fetchBalance } from '../../data/actions/balance-actions';

class BalanceContainer extends React.Component {

    componentDidMount() {
        this.props.fetchBalance();
        console.log( 'didmount', this );
    }

    render() {
        return (
            <div>{ this.props.balance }</div>
        )
    }
}

const mapStateToProps = state => {
    return {
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
