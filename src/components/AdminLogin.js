import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



function AdminLogin() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

 
  const ADMIN_USERNAME = "Telusko";
  const ADMIN_PASSWORD = "1234";

  const onLogin = (data) => {
    reset();
    if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
      alert(`Welcome Admin ${data.username}!`);
      navigate("/admin/dashboard"); 
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
