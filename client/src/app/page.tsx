"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    personalNumber: "",
  });

  // State for handling errors and loading state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        formData
      );

      // Handle the response (e.g., show success message or redirect)
      console.log(response.data);
      // You can redirect the user or show a success message after registration
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Personal Number Field */}
        <div>
          <label>Personal Number:</label>
          <input
            type="text"
            name="personalNumber"
            value={formData.personalNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <div style={{ color: "red" }}>{error}</div>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
