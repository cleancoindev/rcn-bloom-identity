import React, { Fragment, Component } from 'react';
import AttestationTypeForm from '../components/AttestationTypeForm';

const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

class Home extends Component {
  state = {
    ethAddress: null
  };

  _getEthAddress = () => {
    setTimeout(() => {
      const ethAddress = web3 && web3.eth.accounts[0];
      this.setState({
        ethAddress
      });
    }, 2000);
  };

  render() {
    const ethAddress = this.state.ethAddress;
    if (!ethAddress) {
      this._getEthAddress();
    }

    console.log(web3);
    return (
      <Fragment>
        {!web3 && <div>"Web3 must be enabled to register."</div>}
        {web3 &&
          ethAddress && (
            <AttestationTypeForm web3={web3} ethAddress={ethAddress} />
          )}
        {web3 &&
          !ethAddress && <div style={{ color: 'white' }}>Web3 must be unbocked to register.</div>}
      </Fragment>
    );
  }
}

export default Home;