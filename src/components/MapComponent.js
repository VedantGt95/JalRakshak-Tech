import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { getMarkers, setMarker, verifyMarker, deleteMarker } from '../API/api';
import L from "leaflet";
import markerIcon from "./location3.png";


const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [35, 35], // size of the icon
  popupAnchor: [0, -35], // point from which the popup should open relative to the icon
});

function MapComponent({ role, userId, username }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchMarkers();
  }, [markers]);

  const fetchMarkers = async () => {
    try {
      const res = await getMarkers();
    
      setMarkers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching markers", err);
      setMarkers([]);
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        if (role === 'USER') {
          const newMarker = {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            status: 'PENDING',
            createdBy: { id: userId }
          };
          try {
            const res = await setMarker(newMarker);
            setMarkers((prev) => [...prev, res.data]);
          } catch (err) {
            console.error("Error setting marker", err);
          }
        }
      },
    });
    return null;
  }

  const handleVerify = async (id) => {
    try {
      await verifyMarker(id);
      setMarkers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: 'VERIFIED' } : m))
      );
    } catch (err) {
      console.error("Error verifying marker", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMarker(id);
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting marker", err);
    }
  };

  return (
    <MapContainer center={[19.076, 72.8777]} zoom={8} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {Array.isArray(markers) && markers.map((m) => (
        <Marker key={m.id} position={[m.latitude, m.longitude]}  icon={customIcon}>
          <Popup>
            Reported by: {m.createdBy?.id === userId ? username : `User ${m.createdBy?.id}`} <br />
            Lat: {m.latitude.toFixed(4)}, Lng: {m.longitude.toFixed(4)} <br />
            Status: {m.status === 'PENDING' ? '⏳ Pending' : '✅ Verified'}
            {role === 'ADMIN' && (
              <>
                {m.status === 'PENDING' && <><br /><button onClick={() => handleVerify(m.id)}>✔ Verify</button></>}
                <br />
                <button onClick={() => handleDelete(m.id)}>❌ Remove</button>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
