import React, { Component} from 'react'
import { RequestQRCode } from '@bloomprotocol/share-kit'

class Bloom extends Component {
  
  constructor(props) {
    super(props);
  }

  render(){
    const requestData = {
      action: "request_attestation_data",
      token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d041',
      url: "https://bloom.co/api/receiveData",
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: 'Bloom',
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: this.props.data,
    }

    return (
      <div>
        <div className="App-Header">
        </div>
        {<RequestQRCode requestData={requestData} size={300} />}
      </div>
    );
 }

}
export default Bloom;
