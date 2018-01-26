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
    if(this.props.facebookToken){
      graph.setAccessToken(this.props.facebookToken);
      this.getImages();
    }

  }

  getImages() {
    graph.get('/' + this.props.eventId + '/photos?fields=images', (err, res) => {
      if (err){
        throw err;
      }
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
