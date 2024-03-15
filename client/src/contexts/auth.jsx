import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Vous pouvez ajouter une vérification de la validité du token ici
      setUser(token);
    }
  }, []);

  const loginUser = async (userData) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Login successful");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/
      users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");

    // Vous pouvez ajouter une redirection ici si nécessaire
  };

  const contextData = {
    user,
    isLoading,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
