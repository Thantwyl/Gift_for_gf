import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, User, BookOpen, Layers, Briefcase, Mail, LogOut, Shield } from 'lucide-react';

import Login from './Login';
import ManageHero from './ManageHero';
import ManageAbout from './ManageAbout';
import ManageSkills from './ManageSkills';
import ManageProjects from './ManageProjects';
import ManageContact from './ManageContact';

const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-darkBase flex items-center justify-center">
        <div className="text-center">
          <Shield className="animate-pulse text-primary w-12 h-12 mx-auto mb-4" />
          <p className="text-slate-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AdminLayout = () => {
  const { user, loading, isAuthenticated, logout, validateSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Additional security check: validate authentication on route changes
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        const sessionValid = await validateSession();
        if (!sessionValid) {
          navigate('/admin/login', { replace: true });
        }
      }
    };

    if (!loading) {
      checkAuth();
    }
  }, [location.pathname, isAuthenticated, loading, validateSession, navigate]);

  // If on login page, render that solely
  if (location.pathname === '/admin/login') {
    return isAuthenticated ? <Navigate to="/admin" replace /> : <Login />;
  }

  // Additional security: redirect if not authenticated
  if (!isAuthenticated && !loading) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20}/> },
    { name: 'Hero Section', path: '/admin/hero', icon: <User size={20}/> },
    { name: 'About', path: '/admin/about', icon: <BookOpen size={20}/> },
    { name: 'Skills', path: '/admin/skills', icon: <Layers size={20}/> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase size={20}/> },
    { name: 'Contact', path: '/admin/contact', icon: <Mail size={20}/> },
  ];

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
      <div className="min-h-screen bg-slate-900 flex text-slate-200">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col hidden md:flex">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold tracking-tight text-white">Admin <span className="text-primary">Panel</span></h2>
          </div>
          <nav className="flex-1 py-6 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-slate-900 flex flex-col h-screen overflow-hidden">
          <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between md:hidden">
            <h2 className="text-xl font-bold text-white">Admin</h2>
            <button onClick={logout} className="text-red-400"><LogOut size={20}/></button>
          </header>
          <div className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={
                 <div className="text-center py-20">
                   <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
                   <p className="text-slate-400">Select a section from the sidebar to edit your portfolio.</p>
                 </div>
              } />
              <Route path="/hero" element={<ManageHero />} />
              <Route path="/about" element={<ManageAbout />} />
              <Route path="/skills" element={<ManageSkills />} />
              <Route path="/projects" element={<ManageProjects />} />
              <Route path="/contact" element={<ManageContact />} />
            </Routes>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
