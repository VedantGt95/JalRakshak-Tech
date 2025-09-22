import React, { useState } from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import {registerUser} from "../API/api";

function Login() {
  const [role, setRole] = useState(null);

  if (role === 'USER') return <UserDashboard />;
  if (role === 'ADMIN') return <AdminDashboard />;

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => setRole('USER')}>Login as User</button>
      <button onClick={() => setRole('ADMIN')}>Login as Admin</button>
    </div>
  );
}

export default Login;
