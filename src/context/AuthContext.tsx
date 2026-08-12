"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  business: string;
  phone: string;
  avatar: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  signup: (
    businessName: string,
    phone: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "hisabdo.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persist = (u: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  };

  const login = async (phone: string, password: string) => {
    if (!password) {
      throw new Error("Password is required");
    }
    const u: User = {
      id: `u-${Date.now()}`,
      name: "Bilal Traders",
      business: "Bilal Traders",
      phone,
      avatar: "BT",
    };
    persist(u);
  };

  const signup = async (
    businessName: string,
    phone: string,
    password: string,
  ) => {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const avatar = businessName
      .split(" ")
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const u: User = {
      id: `u-${Date.now()}`,
      name: businessName,
      business: businessName,
      phone,
      avatar: avatar || "BT",
    };
    persist(u);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
