import axios from "axios";

const useGetProtectedData = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getProtectedData = async () => {
    const token = localStorage.getItem("token"); // Get token from storage

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/users/protectedRoute`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });

      console.log(response.data); // Data from the protected route
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };
  return { getProtectedData };
};

export default useGetProtectedData;
