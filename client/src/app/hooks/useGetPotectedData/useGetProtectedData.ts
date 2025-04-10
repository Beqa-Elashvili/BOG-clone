import axios from "axios";
import { useAppDispatch } from "@/app/redux";
import { setIsUser, setAllUsers } from "@/redux/globalSlice";

const useGetProtectedData = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useAppDispatch();

  const handleUser = async (userId: string) => {
    try {
      const resp = await axios.get(`${url}/api/users/userId/${userId}`);
      const UsersResp = await axios.get(`${url}/api/users/users?all=true`);
      dispatch(setIsUser(resp.data));
      dispatch(setAllUsers(UsersResp.data));
    } catch (error) {
      console.log(error);
      dispatch(setIsUser(null));
    }
  };

  const getProtectedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      dispatch(setIsUser(null));
      return;
    }
    try {
      const response = await axios.get(`${url}/api/users/protectedRoute`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.user) {
        await handleUser(response.data.user.userId);
      }
    } catch (error) {
      dispatch(setIsUser(null));
      console.error("Error fetching protected data:", error);
    }
  };
  return { getProtectedData };
};

export default useGetProtectedData;
