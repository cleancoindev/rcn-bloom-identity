import React, { Component, Fragment } from 'react';
import { Form, Button } from 'reactstrap';
import Bloom from "../pages/Bloom";

class AttestationTypeForm extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.ethAddress,
      message: null,
      name: '',
      signature: null,
      options: []
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const options = this.state.options
    let index

    if (target.type === 'checkbox') {
      options.push(target.value)
    } else {
      index = options.indexOf(target.value)
      options.splice(index, 1)
    }

    const name = target.name;
    this.setState({
      options: options,
      [name]: value
    });
    console.log(options);
  }

  signMessage = e => {
    e.preventDefault();
    const web3 = this.props.web3;
    const message = {
      name: this.state.name,
      eth_address: this.state.address
    };
    this.setState({
      message
    });
    web3.personal.sign(
      web3.fromUtf8(JSON.stringify(message)),
      web3.eth.coinbase,
      (err, signature) => {
        this.setState({ 
          signature,  
          toBloom: true
        });     
      }
    );
    this.setState({ name: '' });
  };

  render() {
    if (this.state.toBloom) {
      return <Bloom data={this.state.options} />
    }

    return (
      <div className="container">
        {
        <Fragment>
          <Form className="form-container" onSubmit={this.signMessage}>
            <p>{this.state.address}</p>
            <label>
              phone:
              <input
                name="phone"
                type="checkbox"
                value="phone"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              email:
              <input
                name="email"
                type="checkbox"
                value="email"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              facebook:
              <input
                name="facebook"
                type="checkbox"
                value="facebook"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              sanction-screen:
              <input
                name="sanction-screen"
                type="checkbox"
                value="sanction-screen"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              pep-screen:
              <input
                name="pep-screen"
                type="checkbox"
                value="pep-screen"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              id-document:
              <input
                name="id-document"
                type="checkbox"
                value="id-document"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              google:
              <input
                name="google"
                type="checkbox"
                value="google"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
            linkedin:
              <input
                name="linkedin"
                type="checkbox"
                value="linkedin"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              twitter:
              <input
                name="twitter"
                type="checkbox"
                value="twitter"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              payroll:
              <input
                name="payroll"
                type="checkbox"
                value="payroll"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              ssn:
              <input
                name="ssn"
                type="checkbox"
                value="ssn"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              criminal:
              <input
                name="criminal"
                type="checkbox"
                value="criminal"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              offense:
              <input
                name="offense"
                type="checkbox"
                value="offense"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              driving:
              <input
                name="driving"
                type="checkbox"
                value="driving"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              employment:
              <input
                name="employment"
                type="checkbox"
                value="employment"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              education:
              <input
                name="education"
                type="checkbox"
                value="education"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              drug:
              <input
                name="drug"
                type="checkbox"
                value="drug"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              bank:
              <input
                name="bank"
                type="checkbox"
                value="bank"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              utility:
              <input
                name="utility"
                type="checkbox"
                value="utility"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              income:
              <input
                name="income"
                type="checkbox"
                value="income"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              assets:
              <input
                name="assets"
                type="checkbox"
                value="assets"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              full-name:
              <input
                name="full-name"
                type="checkbox"
                value="full-name"
                onChange={this.handleCheckboxChange} />
            </label>
            <label>
              birth-date:
              <input
                name="birth-date"
                type="checkbox"
                value="birth-date"
                onChange={this.handleCheckboxChange} />
            </label>    
            <label>
              gender:
              <input
                name="gender"
                type="checkbox"
                value="gender"
                onChange={this.handleCheckboxChange} />
            </label>     
            <Button
              className="btn-text"
              color="info"
              size="lg"
              block
              outline
              color="info"
              onClick={this.signMessage}
            >
              Submit
            </Button>
          </Form>
        </Fragment>
      }
      </div>
    );
  }
}

export default AttestationTypeForm;