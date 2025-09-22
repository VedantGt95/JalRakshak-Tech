

import { useForm } from "react-hook-form";
import {registerUser} from "../API/api";

function Login() {
   const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.data) {
        alert("User registered successfully!");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        

        <button type="submit" style={{ marginTop: "10px" }}>Register</button>
      </form>
    </div>
  );
}

export default Login;
