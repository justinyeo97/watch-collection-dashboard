import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import './index.css';
import { watches } from './watchData.js'


function Watch({ watches }) {
  return (
    <div className="watch">
      <img src={watches.imageUrl} alt={watches.modelName} className="watch-image" />
      <h4 style={{ fontWeight: 'bold' }}>{watches.modelName}</h4>
      <p><strong>Brand:</strong> {watches.brand}</p>
      <p><strong>Model Number:</strong> {watches.modelNumber}</p>
      <p><strong>Price:</strong> ${watches.price}</p>
      <p><strong>Case Diameter:</strong> {watches.caseDiameterMm}mm</p>
      <p><strong>Movement:</strong> {watches.movementType}</p>
    </div>
  );
}

function WatchCard() {
  return (
    <div className="watchsite">
      {watches.map((watch, i) => (
        <Watch key={i} watches={watch} />
      ))}
    </div>
  );
}

function App() {



  return (
    <div className = "container-fluid">
      <WatchCard />
    </div>
  )
};

export default App
