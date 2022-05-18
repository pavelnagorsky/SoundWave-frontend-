import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

import Slide_1 from '../../assets/images/slides/slide-1.jpg';
import Slide_2 from '../../assets/images/slides/slide-2.jpg';
import Slide_3 from '../../assets/images/slides/slide-3.jpg';

const SlideShow = props => {
  const [slides] = useState([
    {
      src: Slide_1,
      alt: "First slide",
      label: "Welcome to SoundWave music site",
      description: "Explore our music categories and create your own playlists"
    },
    {
      src: Slide_2,
      alt: "Second slide",
      label: "Welcome to SoundWave music site",
      description: "Explore our music categories and create your own playlists"
    },
    {
      src: Slide_3,
      alt: "Third slide",
      label: "Welcome to SoundWave music site",
      description: "Explore our music categories and create your own playlists"
    }
  ]);

  return (
    <Container fluid='lg' className='p-0'>
      <Carousel className='shadow' fade interval={10000}>
        {slides.map(slide => (
          <Carousel.Item key={slide.alt}>
            <img 
              style={{
                maxHeight: "450px"
              }}
              className="d-block w-100"
              src={slide.src}
              alt={slide.alt}
            />
            <Carousel.Caption 
              style={{
                backgroundColor: 'rgba(0,0,0, 0.5)',
                alignItems: 'center'
              }}
            >
              <div className='text-uppercase slideShow-text pb-1'>{slide.label}</div>
              <p className='slideShow-description'>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        
      </Carousel>
    </Container>
  )
};

export default SlideShow;
   
    