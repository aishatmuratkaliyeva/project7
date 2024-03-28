import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imgRef.current);

    const currentImgRef = imgRef.current; 

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef); 
      }
    };
  }, []);

  return <img ref={imgRef} src={isLoaded ? src : ''} alt={alt} />;
};

export default LazyImage;


