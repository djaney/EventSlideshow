import React, {Component} from 'react';
import graph from 'fb-react-sdk';

import Slider from 'react-slick';
import '../css/ImageSlide.css';

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
        images: [...res.data]
      });
      setTimeout(() => {
        this.getImages();
      }, 10000);
    });
  }

  render() {
    const imageList = this.state.images.map((image, index) => <div key={index} style={{backgroundImage:'url('+image.images[0].source+')'}}/>);
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 3000,
      autoplay: true,
      autoplaySpeed: 8000,
      arrows: false
    };
    return <Slider {...settings}>
      {imageList}
    </Slider>;
  }
}

export default MainPage;
