import React from 'react';
import styles from './app.scss';

import BalanceContainer from './container/BalanceContainer/BalanceContainer';

class App extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <BalanceContainer />
    </div>
  }
}

export default App;
