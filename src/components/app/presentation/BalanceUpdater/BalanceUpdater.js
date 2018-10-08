import React from 'react';
import Button from '../Button/Button';
import { UI_STRINGS } from '../../../constants';

import styles from './BalanceUpdater.scss';

export default class BalanceUpdater extends React.Component {
    render() {
        return (
            <div className={ styles.balanceUpdater } >
                <input className={ `js-balance-input ${ styles.balanceUpdater__input }` }
                       type="number"
                       value={ this.props.inputValue }
                       placeholder={ UI_STRINGS.UPDATE_PLACEHOLDER }
                       onChange={ this.props.numberChanged } />
                <span className={ `js-message ${ styles.balanceUpdater__message }` } >{ this.props.message }</span>
                <Button className="js-button-increment" name="Increment" modifier="blue" onClick={ this.props.incrementClick } />
                <Button className="js-button-decrement" name="Decrement" modifier="red" onClick={ this.props.decrementClick } />
            </div>
        )
    }
};