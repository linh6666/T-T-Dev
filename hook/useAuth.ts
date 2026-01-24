import { useState, useEffect } from "react";
import { loginUser } from "../api/apiLogin";
import { getUserInfo } from "../api/apiLoginusename";

interface User {
  full_name: string;
  email: string;
  system_rank?: number;
    is_active?: boolean;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearAuth = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  const getUser = async (token: string) => {
    try {
      const fetchedUser = await getUserInfo(token);
      setUser(fetchedUser);
      setIsLoggedIn(true);
      setError(null);
    } catch (err: any) {
      console.error("Fetch user error:", err);

      // ✅ token hết hạn/sai (backend của bạn trả 403)
      if (err?.status === 401 || err?.status === 403) {
        clearAuth();
        window.location.replace("/dang-nhap");
        return;
      }

      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getUser(token);
    } 
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { access_token } = await loginUser(username, password);
      localStorage.setItem("access_token", access_token);
      await getUser(access_token); // Gọi lại để lấy thông tin người dùng ngay
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    error,
  };
};

export default useAuth;