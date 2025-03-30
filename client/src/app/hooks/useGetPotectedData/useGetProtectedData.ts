import axios from "axios";
import { useAppDispatch } from "@/app/redux";
import { setIsRegisterForm } from "@/redux/globalSlice";

const useGetProtectedData = () => {
  const dispatch = useAppDispatch();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getProtectedData = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      const response = await axios.get(`${url}/api/users/protectedRoute`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setIsRegisterForm(false));
      console.log(response.data);
    } catch (error) {
      dispatch(setIsRegisterForm(true));
      console.error("Error fetching protected data:", error);
    }
  };
  return { getProtectedData };
};

export default useGetProtectedData;
