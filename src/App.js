// App.js
import React from 'react';
import './App.css';
import Gallery from './Gallery';
import LazyImage from './LazyImage';
import CriticalImagePreloader from './CriticalImagePreloader';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Галерея</h1>
      </header>
      <main>
      <CriticalImagePreloader src="link_to_critical_image.jpg" />
      <LazyImage />
        <Gallery />
      </main>
    </div>
  );
}

export default App;

