import React from 'react';
import MapComponent from './MapComponent';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <MapComponent role="ADMIN" />
    </div>
  );
}

export default AdminDashboard;
