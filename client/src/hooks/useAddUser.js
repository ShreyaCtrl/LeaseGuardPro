import { useState } from "react";
// import { CustomSuccessAlert, CustomErrorAlert } from "../utils/general.js";

const useAddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://innovatesphere-server.onrender.com/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }

      console.log("User added successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log(false);
    }
  };

  return { addUser, isAddingUser: isLoading };
};

export default useAddUser;