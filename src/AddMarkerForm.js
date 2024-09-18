import React from 'react';

function AddMarkerForm({ newMarkerData, setNewMarkerData, saveMarker }) {
  return (
    <div className="popup-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveMarker(newMarkerData); // Call the saveMarker function with form data
        }}
      >
        <label>
          Rating:
          <input
            type="text"
            value={newMarkerData.rating}
            onChange={(e) =>
              setNewMarkerData({ ...newMarkerData, rating: e.target.value })
            }
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={newMarkerData.price}
            onChange={(e) =>
              setNewMarkerData({ ...newMarkerData, price: e.target.value })
            }
          />
        </label>
        <label>
          A:
          <input
            type="text"
            value={newMarkerData.a}
            onChange={(e) =>
              setNewMarkerData({ ...newMarkerData, a: e.target.value })
            }
          />
        </label>
        <label>
          B:
          <input
            type="text"
            value={newMarkerData.b}
            onChange={(e) =>
              setNewMarkerData({ ...newMarkerData, b: e.target.value })
            }
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddMarkerForm;
