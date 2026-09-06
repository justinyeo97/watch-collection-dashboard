import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import './index.css';

const watches = [
  {
    id: "1",
    brand: "Rolex",
    modelName: "Cosmograph Daytona",
    modelNumber: "M126519LN-0007",
    price: 15100,
    caseDiameterMm: 40,
    movementType: "Automatic",
    imageUrl: "https://cdn.thehourglass.com/2026/upright_watch_assets_landscape/m126503-0002.webp"
  },
  {
    id: "2",
    brand: "Timex",
    modelName: "Waterbury Classic Chronograph",
    modelNumber: "TW2R38200",
    price: 169,
    caseDiameterMm: 40,
    movementType: "Quartz",
    imageUrl: "https://timex.com/cdn/shop/files/TW2Y24000_5666b548-0c07-4f34-961b-13e4bb2a9456.png?v=1786979664&width=768"
  },
  {
    id: "3",
    brand: "Seiko",
    modelName: "Prospex Alpinist",
    modelNumber: "SPB507",
    price: 750,
    caseDiameterMm: 39.5,
    movementType: "Automatic",
    imageUrl: "https://www.seikowatches.com/id-id/-/media/Images/Product--Image/All/Seiko/2025/09/03/21/05/SPB507J1/SPB507J1.png?mh=1200&mw=1200"
  },
  {
    id: "4",
    brand: "Tissot",
    modelName: "PRX Powermatic 80",
    modelNumber: "T137.407.11.041.00",
    price: 725,
    caseDiameterMm: 40,
    movementType: "Automatic",
    imageUrl: "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dw46721990/product-pictures/bfc139c5-3da5-4a57-849b-4711ef6b0f41_T137-807-44-041-00_Shadow.png?sm=fit&sw=800&sh=800,gravity=center"
  },

  {
    id: "5",
    brand: "Seiko",
    modelName: "Seiko 5 Sports GMT",
    modelNumber: "SSK003",
    price: 475,
    caseDiameterMm: 42.5,
    movementType: "Automatic",
    imageUrl: "https://www.seikowatches.com/us-en/-/media/Images/Product--Image/All/Seiko/2022/06/02/11/39/SSK003K1/SSK003K1.png?mh=1200&mw=1200"
  },
  {
    id: "6",
    brand: "Timex",
    modelName: "Marlin Hand-Wound",
    modelNumber: "TW2T18200",
    price: 209,
    caseDiameterMm: 34,
    movementType: "Manual",
    imageUrl: "https://timex.com/cdn/shop/files/TW2R47900.png?v=1788227030&width=768"
  },

  {
    id: "7",
    brand: "Timex",
    modelName: "Expedition Scout",
    modelNumber: "T49961",
    price: 65,
    caseDiameterMm: 40,
    movementType: "Quartz",
    imageUrl: "https://timex.com/cdn/shop/files/T49961_dfeaae83-964c-4f1d-a7b7-c0114fa51ee7.png?v=1786996865"
  },
  {
    id: "8",
    brand: "Tissot",
    modelName: "Seastar 1000 Powermatic 80",
    modelNumber: "T120.407.11.051.00",
    price: 795,
    caseDiameterMm: 43,
    movementType: "Automatic",
    imageUrl: "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwf51e793a/product-pictures/cfece5b8-ea04-45a9-aeaf-6199b8c6e622_T120-807-11-051-00_Shadow.png?sm=cut&sw=1000&sh=1000,gravity=center"
  },
  {
    id: "9",
    brand: "Tissot",
    modelName: "Gentleman Powermatic 80 Silicium",
    modelNumber: "T127.407.11.041.00",
    price: 825,
    caseDiameterMm: 40,
    movementType: "Automatic",
    imageUrl: "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwfefc9a58/product-pictures/60a7cc9f-da27-48e8-9a1a-dd63463d9954_T127_407_11_041_00.png"
  }
];

function App() {
  const [watchList, setWatchList] = useState(watches);
  const [showForm, setShowForm] = useState(false);

  function addWatch(newWatchData) {
    const newId = (watchList.length + 1).toString();
    setWatchList(prev => [...prev, { id: newId, ...newWatchData }]);
  }

  function deleteWatch(id) {
    setWatchList(prev => prev.filter(watch => watch.id !== id));
  }

  return (
    <div className="container-fluid">
      <Navbar watches={watchList} />
      <br></br>
      <h1 className="text-center collection-name">The Timeless Treasury</h1>
      <div className="container watch-form">
        <button onClick={() => setShowForm(true)} className="add-watch">
          New Watch
        </button>
        {showForm && (
          <>
            <div className="overlay" onClick={() => setShowForm(false)}></div>
            <AddWatch addWatch={addWatch} onClose={() => setShowForm(false)} />
          </>

        )}
      </div>
      <WatchDisplay watches={watchList} deleteWatch={deleteWatch} />
      <footer className="footer">
        <p>© 2024 Chronotelier. All rights reserved.</p>
      </footer>
    </div >
  )
};

//--WATCH DISPLAY COMPONENT--
// WatchDisplay component to display a grid of watches
function WatchDisplay({ watches, deleteWatch, maxWatches = 3 }) {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedMovementType, setSelectedMovementType] = useState('All');
  const [selectedCaseDiameter, setSelectedCaseDiameter] = useState('All');
  const [displayWatches, setDisplayWatches] = useState(watches);
  const [currentPage, setCurrentPage] = useState(1);
  const watchesPerPage = maxWatches;

  //useEffect keeps the display synced with the array update from deleting object. Error showing is false positive.
  useEffect(() => {
    setDisplayWatches(watches);
  }, [watches]);

  const brands = ['All', ...new Set(watches.map(w => w.brand))];
  const priceRanges = ['All', 'Under $500', '$500 - $1000', '$1000 - $5000', 'Over $5000'];
  const movementTypes = ['All', ...new Set(watches.map(w => w.movementType))];
  const caseDiameters = ['All', ...new Set(watches.map(w => w.caseDiameterMm))];


  //event handlers
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

  function handleReset() {
    setSelectedBrand('All');
    setSelectedPriceRange('All');
    setSelectedMovementType('All');
    setSelectedCaseDiameter('All');
    setDisplayWatches(watches);
    setCurrentPage(1);
    setDisplayWatches(watches);
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

      {/*Filter dropdowns, onCHange to trigger filter parameters*/}
      <div className="container filters">
        <select className="filter-select" value={selectedBrand} onChange={handleBrandChange}>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select className="filter-select" value={selectedPriceRange} onChange={handlePriceRangeChange}>
          {priceRanges.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select className="filter-select" value={selectedMovementType} onChange={handleMovementTypeChange}>
          {movementTypes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select className="filter-select" value={selectedCaseDiameter} onChange={handleCaseDiameterChange}>
          {caseDiameters.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <button className="filter-btn" onClick={filterWatches}>Search</button>
        <button className="filter-btn" onClick={handleReset}>Reset</button>
      </div>

      {/* Display filtered watches */}
      <div className="container justify-content-center">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 watch-grid">
          {pagedWatches.map(watch => (
            <div key={watch.id} className="col">
              <Watch watch={watch} deleteWatch={deleteWatch} />
            </div>
          ))}
        </div>
      </div>


      {/* Pagination buttons */}
      <div className="container page-nav" style={{ marginTop: '1rem' }}>
        <button className="nav-btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={isPrevDisabled}>
          Previous
        </button>

        <span className="page-num" style={{ margin: '0 1rem' }}>Page {currentPage}</span>

        <button className="nav-btn" onClick={() => setCurrentPage(currentPage + 1)} disabled={isNextDisabled}>
          Next
        </button>
      </div>


    </div>
  );
}


// Watch component to display watch details
function Watch({ watch, deleteWatch }) {
  const placeholder = '/src/assets/Chronotelier.png';
  return (
    <div className="watch">
      <img src={watch.imageUrl ? watch.imageUrl : placeholder} alt={watch.modelName} className="watch-image" />
      <h4 style={{ fontWeight: 'bold' }}>{watch.modelName}</h4>
      <p><strong>Brand:</strong> {watch.brand}</p>
      <p><strong>Model Number:</strong> {watch.modelNumber}</p>
      <p><strong>Price:</strong> ${watch.price}</p>
      <p><strong>Case Diameter:</strong> {watch.caseDiameterMm}mm</p>
      <p><strong>Movement:</strong> {watch.movementType}</p>
      <button onClick={() => deleteWatch(watch.id)} className="btn btn-danger btn-sm delete">
        Discard
      </button>
    </div>
  );
}

//Navbar with logo
function Navbar({ watches }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img className="logo" src="/Chronotelier.png" alt="Chronotelier Logo" />
        </a>
        <WatchCounter watches={watches} />
      </div>
    </nav>
  )
}

function WatchCounter({ watches }) {
  return (
    <div className="watch-counter">
      <p><strong>Collection: {watches.length}</strong></p>
    </div>
  );
}

//Add a new watch to the collection
function AddWatch({ addWatch, onClose }) {
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [price, setPrice] = useState('');
  const [caseDiameter, setCaseDiameter] = useState('');
  const [movementType, setMovementType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function capitalize(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    addWatch({
      brand: capitalize(brand.trim()),
      modelName: capitalize(modelName.trim()),
      modelNumber,
      price: parseFloat(price),
      caseDiameterMm: parseFloat(caseDiameter),
      movementType: capitalize(brand.trim()),
      imageUrl,
    });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="add-watch-form">
      <input className="form-input" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
      <input className="form-input" placeholder="Model Name" value={modelName} onChange={e => setModelName(e.target.value)} required />
      <input className="form-input" placeholder="Model Number" value={modelNumber} onChange={e => setModelNumber(e.target.value)} required />
      <input className="form-input" type="number" placeholder="Price ($)" value={price} onChange={e => setPrice(e.target.value)} required />
      <input className="form-input" type="number" placeholder="Case Diameter mm" value={caseDiameter} onChange={e => setCaseDiameter(e.target.value)} required />
      <input className="form-input" placeholder="Movement Type" value={movementType} onChange={e => setMovementType(e.target.value)} required />
      <input className="form-input" placeholder="Image URL" value={imageUrl || ""} onChange={e => setImageUrl(e.target.value)} />
      <br></br>
      <button className="submit-btn" type="submit">Add Watch</button>
      <button className="submit-btn" type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}
export default App