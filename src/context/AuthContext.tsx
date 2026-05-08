import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  apiLogin,
  ApiError,
  clearAuth,
  getStoredUser,
  getToken,
  setOnUnauthorized,
} from '../lib/api';

type AuthContextValue = {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ERROR_MAP: Record<string, string> = {
  invalid_credentials: '账号或密码错误',
  missing_fields: '请填写账号和密码',
  server_not_configured: '服务端未配置，请联系管理员',
  http_429: '请求太频繁，请稍后再试',
};

function readableError(code: string): string {
  return ERROR_MAP[code] ?? '登录失败，请重试';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    const t = getToken();
    return t ? getStoredUser() : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOnUnauthorized(() => {
      setUser(null);
    });
    return () => setOnUnauthorized(null);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const result = await apiLogin(username.trim(), password);
      setUser(result.user);
      return { ok: true };
    } catch (e) {
      const code = e instanceof ApiError ? e.code : 'unknown';
      return { ok: false, error: readableError(code) };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 内使用');
  return ctx;
}
