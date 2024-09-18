import React from 'react';
import BerlinMap from './BerlinMap';
import 'leaflet/dist/leaflet.css';

function MapContainer({ activeFilters, setSelectedMarker, customMarkers, setNewMarkerData }) {
  return (
    <div className="map-container">
      <BerlinMap
        activeFilters={activeFilters}
        setSelectedMarker={setSelectedMarker}
        customMarkers={customMarkers}
        addCustomMarker={(location) => setNewMarkerData({ position: location, rating: '', price: '', a: '', b: '' })}
      />
    </div>
  );
}

export default MapContainer;
