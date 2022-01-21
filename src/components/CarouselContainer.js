import React from "react";
import { Carousel } from "react-bootstrap";

import image1 from "./../assets/images/1.jpg";
import image2 from "./../assets/images/2.jpg";
import image3 from "./../assets/images/3.jpg";
// import image4 from "./../assets/images/4.jpg";

const CarouselContainer = () => {
  return (
    <Carousel fade={true} pause={false}>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>
          <h3>HP EliteBook Laptop </h3>
          <p>
            HP Pavilion is a line of consumer-oriented laptop produced by HP
            Inc.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image2} alt="Third slide" />
        <Carousel.Caption>
          <h3>LG Gram 17 Laptop</h3>
          <p>
            It provides a gorgeous display, awesome sound and long battery life.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image3} alt="Third slide" />
        <Carousel.Caption>
          <h3>HP Spectre Laptop</h3>
          <p>HP Spectre x360 has made waves across the industry.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image4} alt="Third slide" />
        <Carousel.Caption>
          <h3>HP Spectre Laptop</h3>
          <p>HP Spectre x360 has made waves across the industry.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default CarouselContainer;
