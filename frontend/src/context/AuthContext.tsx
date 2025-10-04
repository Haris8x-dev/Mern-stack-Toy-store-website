import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import api from "../api/axiosInstance";

interface AuthContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      // 🔹 1. Try local user profile
      const { data } = await api.get("/auth/profile", {
        withCredentials: true,
      });
      setUser(data?.user ?? data ?? null);
    } catch (err) {
      console.warn("Local profile failed, trying Google:", err?.response?.data);

      try {
        // 🔹 2. Try Google user profile
        const { data } = await api.get("/auth/google/profile", {
          withCredentials: true,
        });
        setUser(data?.user ?? data ?? null);
      } catch (googleErr) {
        console.error("Both profile checks failed:", googleErr?.response?.data);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser: fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
