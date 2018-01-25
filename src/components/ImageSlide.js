import React, {Component} from 'react';

class ImageSlide extends Component {

  render() {
    const imageList = this.props.images.map((image, index) => {
      return <img key={index} src={image.images[0].source}/>;
    });

    return <div>{imageList}</div>;
  }
}

export default ImageSlide;
