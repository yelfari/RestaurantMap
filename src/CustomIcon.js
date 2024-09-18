import L from 'leaflet';

// Function to generate a custom SVG icon based on the color passed
export const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="32" fill="${color}" />
        <circle cx="32" cy="32" r="16" fill="#ffffff" />
      </svg>
    `),
    iconSize: [17, 17], // Icon size
    iconAnchor: [19, 38], // Anchor point
    popupAnchor: [0, -38], // Popup a   nchor
  });
}