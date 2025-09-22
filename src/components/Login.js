import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { loginUser, registerUser } from "../API/api";

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); 

  // ---- LOGIN FORM ----
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, reset: resetLogin } = useForm();

  const onLogin = async (data) => {
    try {
      const res = await loginUser(data);
      resetLogin();
      if (res.data) {
        alert(`Welcome ${res.data.username}!`);
        navigate("/map");
      } else {
        alert("User not found. Please register.");
        setShowRegister(true);
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
      setShowRegister(true);
    }
  };

  // ---- REGISTRATION FORM ----
  const { register: regRegister, handleSubmit: handleRegSubmit, formState: { errors: regErrors }, reset: resetReg } = useForm();

  const onRegister = async (data) => {
    try {
      const res = await registerUser(data);
      resetReg();
      if (res.data) {
        alert("User registered successfully! Please login.");
        setShowRegister(false);
        navigate("/login"); // ✅ go back to login
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {!showRegister ? (
        <form onSubmit={handleLoginSubmit(onLogin)}>
          <h2>Login</h2>
          <div>
            <label>Username</label>
            <input
              type="text"
              {...loginRegister("username", { required: "Username is required" })}
            />
            {loginErrors.username && <p>{loginErrors.username.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              {...loginRegister("password", { required: "Password is required" })}
            />
            {loginErrors.password && <p>{loginErrors.password.message}</p>}
          </div>
          <button type="submit" style={{ marginTop: "10px" }}>Login</button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowRegister(true)}>Register</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegSubmit(onRegister)}>
          <h2>Register</h2>
          <div>
            <label>Username</label>
            <input
              type="text"
              {...regRegister("username", { required: "Username is required" })}
            />
            {regErrors.username && <p>{regErrors.username.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              {...regRegister("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
              })}
            />
            {regErrors.email && <p>{regErrors.email.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              {...regRegister("password", { required: "Password is required" })}
            />
            {regErrors.password && <p>{regErrors.password.message}</p>}
          </div>
          <button type="submit" style={{ marginTop: "10px" }}>Register</button>
          <p style={{ marginTop: "10px" }}>
            Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowRegister(false)}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
