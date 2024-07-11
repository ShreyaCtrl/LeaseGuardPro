import { useState } from "react";

const useGetUser = (setUser) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data: ", data);
      localStorage.setItem("token", data.token);
      setUser(data.user); // Make sure the response contains the user data
      setIsLoading(false); // Set loading to false after user is set
      return data.user; // Return the fetched user data
    } catch (error) {
      console.log(error.message);
      setIsLoading(false); // Set loading to false in case of error
      return null; // Return null in case of error
    }
  };

  return { fetchUser, isFetchingUser: isLoading };
};

export default useGetUser;
