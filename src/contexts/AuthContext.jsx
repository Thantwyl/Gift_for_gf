import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, onIdTokenChanged, getIdToken, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Listen for authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!mounted) return;

      if (currentUser) {
        try {
          // Force token refresh to ensure validity
          const token = await getIdToken(currentUser, true);
          if (token) {
            setUser(currentUser);
            setTokenValid(true);
          } else {
            await signOut(auth);
            setUser(null);
            setTokenValid(false);
          }
        } catch (error) {
          console.error("Auth state change error:", error);
          await signOut(auth);
          setUser(null);
          setTokenValid(false);
        }
      } else {
        setUser(null);
        setTokenValid(false);
      }
      setLoading(false);
    });

    // Listen for token changes (automatic refreshes)
    const unsubscribeToken = onIdTokenChanged(auth, async (currentUser) => {
      if (!mounted) return;

      if (currentUser) {
        try {
          const token = await getIdToken(currentUser);
          setTokenValid(!!token);
        } catch (error) {
          console.error("Token change error:", error);
          setTokenValid(false);
        }
      } else {
        setTokenValid(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  // Security method to validate current session
  const validateSession = async () => {
    if (!user) return false;

    try {
      const token = await getIdToken(user, true);
      return !!token;
    } catch (error) {
      console.error("Session validation failed:", error);
      await signOut(auth);
      return false;
    }
  };

  // Secure logout method
  const secureLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setTokenValid(false);
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Secure logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    tokenValid,
    isAuthenticated: !!(user && tokenValid),
    validateSession,
    logout: secureLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};