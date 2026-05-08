import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

const AUTH_KEY = 'liuxin.auth';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin1234';

type AuthContextValue = {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_KEY);
    } catch {
      return null;
    }
  });

  const login = useCallback((username: string, password: string) => {
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return { ok: false, error: '账号或密码错误' };
    }
    setUser(username);
    try {
      localStorage.setItem(AUTH_KEY, username);
    } catch {
      // ignore
    }
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 内使用');
  return ctx;
}
