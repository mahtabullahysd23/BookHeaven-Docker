import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.style.scss";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <div className="slides">
            <img src="/02.jpg" alt="Image 1" />
            <img src="/02.jpg" alt="Image 1" />
          </div>
        </div><div>
          <div className="slides">
            <img src="/02.jpg" alt="Image 1" />
            <img src="/02.jpg" alt="Image 1" />
          </div>
        </div><div>
          <div className="slides">
            <img src="/02.jpg" alt="Image 1" />
            <img src="/02.jpg" alt="Image 1" />
          </div>
        </div><div>
          <div className="slides">
            <img src="/02.jpg" alt="Image 1" />
            <img src="/02.jpg" alt="Image 1" />
          </div>
        </div>
        
      </Slider>
    </div>
  );
};

export default Carousel;
