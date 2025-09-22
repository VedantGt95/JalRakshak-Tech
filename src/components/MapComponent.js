import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function MapComponent({ role }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    
    setMarkers([
      { id: 1, lat: 19.076, lng: 72.8777, user: 'UserA' },
      { id: 2, lat: 18.5204, lng: 73.8567, user: 'UserB' },
    ]);
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (role === 'USER') {
          const newMarker = {
            id: Date.now(),
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            user: 'CurrentUser',
          };
          setMarkers((prev) => [...prev, newMarker]);
        }
      },
    });
    return null;
  }

  const handleDelete = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MapContainer center={[19.076, 72.8777]} zoom={8} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>
            Reported by: {m.user} <br />
            Lat: {m.lat.toFixed(4)}, Lng: {m.lng.toFixed(4)}
            {role === 'ADMIN' && (
              <>
                <br />
                <button onClick={() => handleDelete(m.id)}>Remove</button>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
