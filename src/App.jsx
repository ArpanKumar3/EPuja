import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import PujaDetailPage from './pages/PujaDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import Footer from './components/Footer';

// User Dashboard
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverviewPage from './pages/dashboard/DashboardOverviewPage';
import MyPujasPage from './pages/dashboard/MyPujasPage';
import MyProfilePage from './pages/dashboard/MyProfilePage';
import WalletPage from './pages/dashboard/WalletPage';
import SupportPage from './pages/dashboard/SupportPage';

// Admin Section
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PujaManagementPage from './pages/admin/PujaManagementPage';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/admin/login'].includes(location.pathname);
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isAdminPage = location.pathname.startsWith('/admin');

  const showHeaderFooter = !isAuthPage && !isDashboardPage && !isAdminPage;

  return (
    <LanguageProvider>
      {showHeaderFooter && <Header />}
      <main className={isDashboardPage || isAdminPage ? '' : 'min-h-screen'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/puja/:pujaId" element={<PujaDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected User Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="pujas" element={<MyPujasPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="pujas" element={<PujaManagementPage />} />
          </Route>

        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </LanguageProvider>
  );
}

export default App;
