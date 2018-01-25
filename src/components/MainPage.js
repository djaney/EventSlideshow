import React, {Component} from 'react';
import graph from 'fb-react-sdk';
import ImageSlide from './ImageSlide';
class MainPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }


  componentDidMount() {
    graph.setAccessToken(this.getParameterByName("token", window.location.href));

    this.getImages();

  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  getImages() {
    graph.get('/' + this.props.eventId + '/photos?fields=images', (err, res) => {
      this.setState({
        images: this.state.images.concat(res.data)
      });
      setTimeout(() => {
        this.getImages();
      }, 10000);
    });
  }

  render() {
    return <div><ImageSlide images={this.state.images}/></div>;
  }
}

export default MainPage;
