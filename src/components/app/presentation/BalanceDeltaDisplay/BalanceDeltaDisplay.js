import React from 'react';
import { UI_STRINGS } from '../../../constants';

import styles from './BalanceDeltaDisplay.scss';
import itemStyles from './BalanceDisplayItem.scss';

export default class BalanceDeltaDisplay extends React.Component {
    render() {
        return (
            <div className={ styles.balanceDeltaDisplay } >
                <h2 className={ styles.balanceDeltaDisplay__heading } >{ UI_STRINGS.BALANCE_HISTORY }</h2>
                <ul className={ styles.balanceDeltaDisplay__list } >
                    { this.props.deltas.map( ( delta, i ) => {
                        return <li key={ i } className={ itemStyles.balanceDisplayItem } >
                                    <span className={ `js-delta-title ${ itemStyles.balanceDisplayItem__title }` }>
                                        { delta.message }
                                    </span>
                                    <span className={ `js-delta-final-balance ${ itemStyles.balanceDisplayItem__finalBalance }` }>
                                        { delta.finalBalance }
                                    </span>
                                </li>
                    } ) }
                    { this.props.deltas.length === 0 ? <span className={ `js-empty-message ${ styles.balanceDeltaDisplay__emptyMessage }` } >{ UI_STRINGS.TRANSACTIONS_NONE }</span> : '' }
                </ul>
            </div>
        )
    }
}

