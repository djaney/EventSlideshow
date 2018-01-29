import React, {Component} from 'react';
import MainPage from './components/MainPage';
import FacebookAuth from './components/FacebookAuth';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };

    this.onAuth = this.onAuth.bind(this);
    this.onError = this.onError.bind(this);
  }

  onAuth(data) {
    const token = data.authResponse.accessToken;
    this.setState({
      token,
    })
  }

  onError(token) {
    this.setState({
      token,
    })
  }


  render() {
    return (<div>
      {this.state.token ? <MainPage eventId="1933453670208493" facebookToken={this.state.token}/> : null}
      <FacebookAuth appId="402455073518566" onAuth={this.onAuth}/>
    </div>);
  }
}

export default App;
