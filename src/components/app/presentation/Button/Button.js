import React from 'react';

import styles from './Button.scss';

export default class Button extends React.Component {
    render() {
        return (
            <button className={ `${ styles.button } ${ styles[ 'button--' + this.props.modifier ] }` }
                    type="button"
                    onClick={ this.props.onClick } >
                    { this.props.name }
            </button>
        );
    }
}