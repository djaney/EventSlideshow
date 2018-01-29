import React, {Component} from 'react';
import graph from 'fb-react-sdk';

import Slider from 'react-slick';
import '../css/ImageSlide.css';

class MainPage extends Component {

  imageTimeout = null

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      before: null,
      after: null
    };
  }


  componentWillReceiveProps(props) {
    if (this.props.facebookToken) {
      graph.setAccessToken(this.props.facebookToken);
      this.getImages(props.eventId);
    }

  }

  getImages(eventId) {
    if (!eventId) return;
    if (this.imageTimeout) clearTimeout(this.imageTimeout);
    graph.get('/' + eventId + '/photos?fields=images', (err, res) => {
      if (err) {
        throw err;
      }
      if (res.paging.cursors.before !== this.state.before || res.paging.cursors.after !== this.state.after) {
        this.setState({
          images: [...res.data],
          before: res.paging.cursors.before,
          after: res.paging.cursors.after,
        });
      }

      this.imageTimeout = setTimeout(() => {
        this.getImages(eventId);
      }, 10000);
    });
  }

  render() {
    const imageList = this.state.images.map((image, index) => (
      <div key={index}>
        <div className="bg" style={{backgroundImage: 'url(' + image.images[0].source + ')'}}/>
        <div className="fg" style={{backgroundImage: 'url(' + image.images[0].source + ')'}}/>
      </div>


    ));
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 3000,
      autoplay: true,
      autoplaySpeed: 8000,
      arrows: false,
      pauseOnHover: false,
    };

    return (<div>
      {0 < imageList.length ?
        <Slider {...settings}>
          {imageList}
        </Slider>
        : null}

    </div>);
  }
}

export default MainPage;
