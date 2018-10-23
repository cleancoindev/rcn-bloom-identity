import React, { Component} from 'react'
import { RequestQRCode } from '@bloomprotocol/share-kit'

class Bloom extends Component {
  
  constructor(props) {
    super(props);
  }

  render(){
    const requestData = {
      action: 'request_attestation_data',
      token: '',
      url: '',
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: 'RCN',
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: this.props.data,
    }

    return (
      <div>
        <div className="App-Header">
        </div>
        {<RequestQRCode requestData={requestData} size={200} />}
      </div>
    );
 }

}
export default Bloom;
