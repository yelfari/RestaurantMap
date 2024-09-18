import React from 'react';
import './styles/FilterMenu.css';
import './styles/BerlinMap.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createCustomIcon } from './CustomIcon';
import L from 'leaflet'; // Import Leaflet for icon fix

// Fix the default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function BerlinMap({
  activeFilters,
  setSelectedMarker,
  customMarkers, 
  addCustomMarker, 
  setLatLng,
  showSupaview,
  setShowSupaview,
  showShowMarkerButton,
  setShowAddmarkerButton }) {
  const blueIcon = createCustomIcon('#0078ff');
  const redIcon = createCustomIcon('#ff0000');
  const greenIcon = createCustomIcon('#00ff00');
  const purpleIcon = createCustomIcon('#800080');

  // Capture map clicks to set lat/lng
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  // Define marker data with rating, price, a, b, etc.
  const markerData = {
    blue: {
      position: [52.52, 13.405],
      rating: '4.5',
      price: '€€',
      a: 'Info A1',
      b: 'Info B1',
    },
    red: {
      position: [52.53, 13.406],
      rating: '3.8',
      price: '€€€',
      a: 'Info A2',
      b: 'Info B2',
    },
    green: {
      position: [52.54, 13.407],
      rating: '4.7',
      price: '€',
      a: 'Info A3',
      b: 'Info B3',
    },
    purple: {
      position: [52.55, 13.408],
      rating: '4.0',
      price: '€€',
      a: 'Info A4',
      b: 'Info B4',
    },
  };

  return (
    <MapContainer
      center={[52.52, 13.405]}
      zoom={15}
      scrollWheelZoom={true}
      minZoom={12}
      onClick={() => setSelectedMarker(null)} // Close the table if map is clicked
      style={{ height: '100%', width: '100%' }}
      
    >
      <button className='AddMarkerButton' onClick={() => {setShowAddmarkerButton(false); setShowSupaview(true);}}> Add Location </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        
      />
      
      {/* Map click handler component */}
      <MapClickHandler />

      {/* Render Custom Markers */}
      {customMarkers.map((marker, idx) => (
        <Marker
          key={idx}
          position={marker.position}
          icon={redIcon} // Use a consistent icon for custom markers
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              setSelectedMarker(marker); // Set custom marker data on click
            },
          }}
        >
          <Popup>
            <div>
              <strong>Rating:</strong> {marker.rating}<br />
              <strong>Price:</strong> {marker.price}<br />
              <strong>A:</strong> {marker.a}<br />
              <strong>B:</strong> {marker.b}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render Markers conditionally based on activeFilters */}
      {Object.entries(markerData).map(([color, data]) => (
        activeFilters[color] && (
          <Marker
            key={color}
            position={data.position}
            icon={createCustomIcon(color)}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                setSelectedMarker(data);
              },
            }}
          >
            <Popup>{color.charAt(0).toUpperCase() + color.slice(1)} Marker</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}

export default BerlinMap;
