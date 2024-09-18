import React from 'react';

function FilterMenu({ activeFilters, toggleFilter, selectedMarker, setSelectedMarker }) {
  const renderStars = (rating) => {
    const starCount = Math.round(parseFloat(rating));
    return '★'.repeat(starCount);
  };

  return (
    <div className="filter-menu">
      <button className={activeFilters.blue ? 'active' : ''} onClick={() => toggleFilter('blue')}>
        Döner Läden
      </button>
      <button className={activeFilters.red ? 'active' : ''} onClick={() => toggleFilter('red')}>
        All you can eat
      </button>
      <button className={activeFilters.green ? 'active' : ''} onClick={() => toggleFilter('green')}>
        Arabisch
      </button>
      <button className={activeFilters.purple ? 'active' : ''} onClick={() => toggleFilter('purple')}>
        Sonstige
      </button>
      

      {selectedMarker && (
        <div className="marker-details">
          <button className="close-btn" onClick={() => setSelectedMarker(null)}>X</button>
          <p><strong>Rating:</strong> {renderStars(selectedMarker.rating)}</p>
          <p><strong>Price:</strong> {selectedMarker.price}</p>
          <p><strong>A:</strong> {selectedMarker.a}</p>
          <p><strong>B:</strong> {selectedMarker.b}</p>
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
