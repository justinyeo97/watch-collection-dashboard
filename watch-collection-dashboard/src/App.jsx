import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import './index.css';
import { watches } from './watchData.js'

function App() {



  return (
    <div className="container-fluid">
      <Navbar />
      <WatchDisplay watches={watches} />
    </div>
  )
};

//--WATCH DISPLAY COMPONENT--
// WatchDisplay component to display a grid of watches
function WatchDisplay({ watches, maxWatches = 3 }) {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedMovementType, setSelectedMovementType] = useState('All');
  const [selectedCaseDiameter, setSelectedCaseDiameter] = useState('All');
  const [displayWatches, setDisplayWatches] = useState(watches);
  const [currentPage, setCurrentPage] = useState(1);
  const watchesPerPage = maxWatches;

  const brands = ['All', ...new Set(watches.map(w => w.brand))];
  const priceRanges = ['All', 'Under $500', '$500 - $1000', '$1000 - $5000', 'Over $5000'];
  const movementTypes = ['All', ...new Set(watches.map(w => w.movementType))];
  const caseDiameters = ['All', ...new Set(watches.map(w => w.caseDiameterMm))];

  function handleBrandChange(e) {
    setSelectedBrand(e.target.value);
  }
  function handlePriceRangeChange(e) {
    setSelectedPriceRange(e.target.value);
  }

  function handleMovementTypeChange(e) {
    setSelectedMovementType(e.target.value);
  }

  function handleCaseDiameterChange(e) {
    setSelectedCaseDiameter(e.target.value);
  }
  //filtering logic
  function filterWatches() {
    const filtered = watches.filter(watch => {
      const brandMatch = selectedBrand === 'All' || watch.brand === selectedBrand;
      const priceRangeMatch =
        selectedPriceRange === 'All' ||
        (selectedPriceRange === 'Under $500' && watch.price < 500) ||
        (selectedPriceRange === '$500 - $1000' && watch.price >= 500 && watch.price <= 1000) ||
        (selectedPriceRange === '$1000 - $5000' && watch.price > 1000 && watch.price <= 5000) ||
        (selectedPriceRange === 'Over $5000' && watch.price > 5000);
      const movementTypeMatch = selectedMovementType === 'All' || watch.movementType === selectedMovementType;
      const caseDiameterMatch = selectedCaseDiameter === 'All' || watch.caseDiameterMm === parseFloat(selectedCaseDiameter);
      return brandMatch && priceRangeMatch && movementTypeMatch && caseDiameterMatch;
    });
    setDisplayWatches(filtered);
    setCurrentPage(1);
  }
  //pagination logic
  const startIndex = (currentPage - 1) * watchesPerPage;
  const pagedWatches = displayWatches.slice(startIndex, startIndex + watchesPerPage);
  //prevent invalid page navigation
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = startIndex + watchesPerPage >= displayWatches.length;

  return (
    <div>



      {/* Filter dropdowns */}
      <select value={selectedBrand} onChange={handleBrandChange}>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
        {priceRanges.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <select value={selectedMovementType} onChange={handleMovementTypeChange}>
        {movementTypes.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select value={selectedCaseDiameter} onChange={handleCaseDiameterChange}>
        {caseDiameters.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <button onClick={filterWatches}>Filter</button>

      {/* Display filtered watches */}
      <div className="container">
        <div className="row row-cols-3 watch-grid">
          {pagedWatches.map(watch => (
            <div key={watch.id} className="col">
              <Watch watch={watch} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination buttons */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={isPrevDisabled}>
          Previous
        </button>

        <span style={{ margin: '0 1rem' }}>Page {currentPage}</span>

        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={isNextDisabled}>
          Next
        </button>
      </div>
    </div>
  );
}


// Watch component to display watch details
function Watch({ watch }) {
  return (
    <div className="watch">
      <img src={watch.imageUrl} alt={watch.modelName} className="watch-image" />
      <h4 style={{ fontWeight: 'bold' }}>{watch.modelName}</h4>
      <p><strong>Brand:</strong> {watch.brand}</p>
      <p><strong>Model Number:</strong> {watch.modelNumber}</p>
      <p><strong>Price:</strong> ${watch.price}</p>
      <p><strong>Case Diameter:</strong> {watch.caseDiameterMm}mm</p>
      <p><strong>Movement:</strong> {watch.movementType}</p>
    </div>
  );
}


function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}

export default App