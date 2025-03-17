import React, {useEffect, useRef, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS styles 
import "./Carousel.css";

function ImageCarousel() {

    const carouselRef = useRef(null);

    const [randomImageURL, setRandomImageURL] = useState({});

    const [randomQueryImages, setRandomQueryImages] = useState([]);

    const PIXABAY_API_KEY = '44320077-53d74422d2c222a47ec16ff9b';

    const QUERY = "tennis";

    const URL = "https://pixabay.com/api/?key="+PIXABAY_API_KEY+"&per_page=193&q="
    +encodeURIComponent(QUERY);

    useEffect(()=> {

      const fetchEmAll = async () => {
        fetch(URL)
        .then(res => res.json())
        .then(data => {
          //console.log("pixabay data: ", data);

          setRandomQueryImages(data.hits);
  
          let randomIndex = Math.floor(Math.random() * data.hits.length);
  
          const randomElement = data.hits[randomIndex];

          //console.log(randomElement)
  
          setRandomImageURL(randomElement);
        });
      }

      fetchEmAll();



    }, []);

    useEffect(()=> {
      //console.log(randomImageURL);
    }, [randomImageURL])

    const items = [
        {
          name: "Image 1",
          description: "A beautiful landscape",
          src: randomQueryImages[Math.floor(Math.random() * randomQueryImages?.length)]?.largeImageURL,
        },
        {
          name: "Image 2",
          description: "A cute animal",
          src: randomQueryImages[Math.floor(Math.random() * randomQueryImages?.length)]?.largeImageURL,
        },
        {
          name: "Image 3",
          description: "Inspiring architecture",
          src: `${randomQueryImages[Math.floor(Math.random() * randomQueryImages?.length)]?.largeImageURL}`,
        },
    ];

  return (
    <div className='my-carousel-wrapper'>
    <Carousel
        ref={carouselRef}
        showThumbs={false}
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        stopOnHover={false}
        showStatus={false}
        //dynamicHeight={true}
    >
      {items.map((item, i) => (
        <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
          <img 
            id={i}
            src={item.src} 
            alt={item.name} 
            style={{
              maxHeight: "500px",
              objectFit: 'cover'
            }} 
          />
        </div>

      ))}
      
    </Carousel>

    
      {/* <img alt="" src={randomImageURL.pageURL}/> */}
    </div>
  );
}

export default ImageCarousel;