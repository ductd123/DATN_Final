import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = window.localStorage.getItem("user");
        const userData = JSON.parse(data);

        setUser(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData().then();
  }, []);

  return { user, loading, setUser };
};
