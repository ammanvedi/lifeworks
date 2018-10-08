import React from 'react';
import { UI_STRINGS } from '../../../constants';
import { formatCurrency } from '../../../util';

import styles from './BalanceDisplay.scss';

export default class BalanceDisplay extends React.Component {

    getDisplayBalance( balance ) {

        if ( typeof balance !== 'number' ) {
            return '-.--';
        }

        return formatCurrency( balance, this.props.currency );
    }

    render() {
        return (
            <div className={ styles.balanceDisplay } >
                <h1 className={ `js-balance-name ${ styles.balanceDisplay__heading }` } >{ this.props.name }</h1>
                <p className={ `js-balance-value ${ styles.balanceDisplay__balance } ${ this.props.balance < 0 ? styles[ 'balanceDisplay__balance--red' ]: '' }` } >
                    { this.getDisplayBalance( this.props.balance ) }
                </p>
                { this.props.balance < 0 ? (
                    <p className={ `js-balance-message ${ styles.balanceDisplay__message }` } >
                        { UI_STRINGS.BALANCE_NEGATIVE }
                    </p> ) : '' }
            </div>
        )
    }
}