"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Authentification from "./(auth)/authentification";

export default function Home() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    personalNumber: "",
  });

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Register form error and loading states
  const [errorRegistration, setErrorRegistration] = useState<string | null>(
    null
  );
  const [loadingRegistration, setLoadingRegistration] = useState(false);

  const loginUser = async (email: string, password: string): Promise<any> => {
    try {
      console.log("gaehsva");
      const response = await axios.post(`${url}/api/users/login`, {
        email,
        password,
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      return null;
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setErrorMessage("");

    const user = await loginUser(email, password);

    if (user) {
      console.log("User logged in:", user);
      localStorage.setItem("token", user.token);
      window.location.href = "/dashboard";
    } else {
      setErrorMessage("Invalid email or password");
    }

    setLoadingLogin(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRegistration(true);
    setErrorRegistration(null);

    try {
      const response = await axios.post(`${url}/api/users/register`, formData);
      console.log("User created:", response.data);
    } catch (err: any) {
      console.error(err);
      setErrorRegistration(err.response?.data?.error || "An error occurred");
    } finally {
      setLoadingRegistration(false);
    }
  };

  return (
    <Authentification />
    // <div>
    //   <h1>Create User</h1>
    //   <form onSubmit={handleSubmit}>
    //     {/* Email Field */}
    //     <div>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Password Field */}
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Name Field */}
    //     <div>
    //       <label>Name:</label>
    //       <input
    //         type="text"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Phone Number Field */}
    //     <div>
    //       <label>Phone Number:</label>
    //       <input
    //         type="text"
    //         name="phoneNumber"
    //         value={formData.phoneNumber}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Personal Number Field */}
    //     <div>
    //       <label>Personal Number:</label>
    //       <input
    //         type="text"
    //         name="personalNumber"
    //         value={formData.personalNumber}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     {/* Error Message */}
    //     {errorRegistration && (
    //       <div style={{ color: "red" }}>{errorRegistration}</div>
    //     )}

    //     {/* Submit Button */}
    //     <button type="submit" disabled={loadingRegistration}>
    //       {loadingRegistration ? "Creating..." : "Create User"}
    //     </button>
    //   </form>

    //   <div>this is login</div>
    //   <form onSubmit={handleLoginSubmit}>
    //     {/* Email Field for Login */}
    //     <div>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>

    //     {/* Password Field for Login */}
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>

    //     {/* Error Message for Login */}
    //     {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

    //     {/* Submit Button for Login */}
    //     <button type="submit" disabled={loadingLogin}>
    //       {loadingLogin ? "Logging in..." : "Login"}
    //     </button>
    //   </form>
    // </div>
  );
}
