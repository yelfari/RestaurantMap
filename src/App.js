import './styles/App.css';
import { useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BerlinMap from './BerlinMap'; // Import updated BerlinMap
import FilterMenu from './FilterMenu';
import './styles/Map&FilterLayout.css';
import './styles/ReviewWindow.css';
import './styles/CustomMarker.css';
import './styles/scrolldownContainer.css';

function App() {
  const [activeFilters, setActiveFilters] = useState({
    blue: true,
    red: true,
    green: true,
    purple: true,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [newMarkerData, setNewMarkerData] = useState(null);
  const [showSupaview, setShowSupaview] = useState(false);
  const [showShowMarkerButton, setShowAddmarkerButton] = useState(true);

  // New state to store latitude and longitude
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  // New state to manage button text
  const [buttonText, setButtonText] = useState("Select Location on Map");

  const addCustomMarker = (markerData) => {
    setCustomMarkers([...customMarkers, markerData]);
    setShowSupaview(false); // Close the supaview after submission
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Header />
        <div className="filter-menu-container">
          <FilterMenu
            activeFilters={activeFilters}
            toggleFilter={(color) =>
              setActiveFilters((prevFilters) => ({
                ...prevFilters,
                [color]: !prevFilters[color],
              }))
            }
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
        </div>
        <div className="content-container">
          <div className="map-container">
            <BerlinMap
              activeFilters={activeFilters}
              setSelectedMarker={setSelectedMarker}
              customMarkers={customMarkers}
              addCustomMarker={addCustomMarker}
              setLatLng={setLatLng} // Pass setLatLng to capture map click
              setShowSupaview={setShowSupaview} // Pass these props to BerlinMap
              showSupaview={showSupaview}       // Pass showSupaview
              setShowAddmarkerButton={setShowAddmarkerButton} // Pass this state
              showShowMarkerButton={showShowMarkerButton}     // Pass this state
              
            />
          </div>

          {showSupaview && (
            <div className="supaviews">
              <img className="supaviews__logo" src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88d26018-fa1a-4b92-a8b9-d8ed3f9e178e_3840x2160.png"/>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
              <div className="supaviews__gradient"></div>
              <div className="supaviews__add">
                <div className="supaview">
                  <h1 className="supaview__title">Add Review</h1>
                  <form
                    id="review"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const markerData = {
                        position: [latLng.lat, latLng.lng], // Use the captured lat/lng from state
                        rating: formData.get('rating'),
                        price: formData.get('price'),
                        a: formData.get('a'),
                        b: formData.get('b'),
                      };
                      addCustomMarker(markerData);
                      setShowAddmarkerButton(true);
                    }}
                  >
                    <fieldset className="supaview__rating">
                      <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
                      <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
                      <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
                      <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
                      <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1"></label>
                    </fieldset>
                    <div className="supaview__copy">
                      {/* Display latitude and longitude from the map click */}
                      <button
                        type="button"
                        className="supaview__button"
                        onClick={() => setButtonText("Click on map")}
                      >
                        {buttonText} {/* Display button text based on state */}
                      </button>
                      <p>Latitude: {latLng.lat || 'Not set'}</p>
                      <p>Longitude: {latLng.lng || 'Not set'}</p>
                      <input type="text" name="name" placeholder="Name" required/>
                      <textarea name="message" placeholder="Message" rows="5"></textarea>
                      <input type="text" name="price" placeholder="Price" required/>
                      <input type="text" name="a" placeholder="Info A"/>
                      <input type="text" name="b" placeholder="Info B"/>
                    </div>
                    <button className="supaview__submit">Submit review</button>
                  </form>
                </div>
              </div>
              <div className="supaviews__list">
                <div className="supaview">Looks empty around here..</div>
              </div>
            </div>
          )}

          
        </div>
      </header>
    </div>
  );
}

export default App;
