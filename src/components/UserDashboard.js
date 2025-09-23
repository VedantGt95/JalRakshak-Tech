import React from 'react';
import MapComponent from './MapComponent';

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div>
      <h2>User Dashboard</h2>
      <MapComponent  
        role={user.role || "USER"} 
        userId={user.id} 
        username={user.username} 
      />
    </div>
  );
}

export default UserDashboard;
