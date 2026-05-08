import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import HomePage from './pages/HomePage';
import MoodPage from './pages/MoodPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <div className="relative min-h-screen overflow-x-hidden">
          <CursorGlow />
          <Nav />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/mood"
                element={
                  <RequireAuth>
                    <MoodPage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
