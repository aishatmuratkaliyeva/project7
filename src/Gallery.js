import React, { useState, useEffect } from 'react';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loadTime, setLoadTime] = useState(null);
  const [imageLoadTimes, setImageLoadTimes] = useState({});

  useEffect(() => {
    const startTime = performance.now();

    fetch('https://api.unsplash.com/photos/random/?client_id=7rVwLIIxEQOo_L9uRHmr4-PoXVRzRx1NEPjEm1MmX90&count=10')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        setLoadTime(timeElapsed);
        measureImageLoadTimes(data, startTime); 
      })
      .catch(error => console.error('Ошибка при загрузке изображений:', error));
  }, []);

  const measureImageLoadTimes = (images, startTime) => {
    const imageLoadTimes = {};
    images.forEach(image => {
      const img = new Image();
      img.src = image.urls.small;
      img.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        imageLoadTimes[image.id] = loadTime;
        setImageLoadTimes({ ...imageLoadTimes }); 
      };
    });
  };

  return (
    
      <div className="gallery">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            {imageLoadTimes[image.id] && (
              <div>Время загрузки изображения: {imageLoadTimes[image.id].toFixed(2)} миллисекунды</div>
            )}
          </div>
        ))}
      </div>
    
  );
}

export default Gallery;


