import React, {Component} from 'react';
import MainPage from './components/MainPage';
import FacebookAuth from './components/FacebookAuth';
import './App.css';
import SlideShowControls from "./components/SlideShowControls";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      eventId: null
    };

    this.onAuth = this.onAuth.bind(this);
    this.onError = this.onError.bind(this);
    this.setEventId = this.setEventId.bind(this);
  }

  setEventId(event){
    this.setState({
      eventId: event.id
    })
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
      {this.state.token ?
        <SlideShowControls facebookToken={this.state.token} onEventSelected={this.setEventId}>
          <MainPage eventId={this.state.eventId} facebookToken={this.state.token}/>
        </SlideShowControls>
        : null}

      <FacebookAuth appId="402455073518566" onAuth={this.onAuth}/>
    </div>);
  }
}

export default App;
