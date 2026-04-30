import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SecureRoute = ({ children }) => {
  const { isAuthenticated, loading, validateSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSecurity = async () => {
      if (!loading && !isAuthenticated) {
        navigate('/admin/login', { replace: true });
        return;
      }

      if (isAuthenticated) {
        const sessionValid = await validateSession();
        if (!sessionValid) {
          navigate('/admin/login', { replace: true });
        }
      }
    };

    checkSecurity();
  }, [isAuthenticated, loading, validateSession, navigate]);

  // Don't render anything while checking authentication
  if (loading || !isAuthenticated) {
    return null;
  }

  return children;
};

export default SecureRoute;