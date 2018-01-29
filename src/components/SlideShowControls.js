import React, {Component} from 'react';
import {Sidebar, Button, Menu} from 'semantic-ui-react'
import graph from "fb-react-sdk";

class SlideShowControls extends Component {


  constructor(props) {
    super(props);
    this.state = {visible: false, events: [], eventId: null};

    this.toggleVisibility = this.toggleVisibility.bind(this);
    // this.eventSelected = this.eventSelected.bind(this);
  }

  toggleVisibility() {
    this.setState({visible: !this.state.visible});
  }

  componentDidMount() {
    if(this.props.facebookToken){
      graph.setAccessToken(this.props.facebookToken);
      this.getEvents();
    }

  }

  eventSelected(event){
    this.setState({
      eventId: event.id
    });
    this.props.onEventSelected && this.props.onEventSelected(event);
  }

  getEvents() {
    graph.get('/me/events?type=created', (err, res) => {
      if (err){
        throw err;
      }
      this.setState({
        events: [...res.data]
      });
    });
  }

  render() {
    const {visible, events} = this.state;
    const eventsList = events.map(event => (
      <Menu.Item key={event.id} active={this.state.eventId === event.id} onClick={this.eventSelected.bind(this,event)}>
      {event.name}
      </Menu.Item>
    ));
    return <div  className="app-full-screen">
      <Sidebar.Pushable>
        <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
          {eventsList}
        </Sidebar>
        <Sidebar.Pusher>
          {this.props.children}
          <Button circular basic icon='settings' onClick={this.toggleVisibility} className="app-floating-button"/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>;
  }
}

export default SlideShowControls;