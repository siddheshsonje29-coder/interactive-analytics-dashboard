import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { TableSkeleton } from '../components/ui/LoadingSkeleton';

// Lazy loading imports
const Login = React.lazy(() => import('../pages/Login'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Analytics = React.lazy(() => import('../pages/Analytics'));
const Users = React.lazy(() => import('../pages/Users'));
const Reports = React.lazy(() => import('../pages/Reports'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Notifications = React.lazy(() => import('../pages/Notifications'));

// Fallback skeleton loader
const PageSuspense = ({ children }) => (
  <Suspense fallback={<TableSkeleton rows={4} cols={5} />}>
    {children}
  </Suspense>
);

/**
 * AppRoutes - Main router mapping configuration.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Publicly available views */}
      <Route path="/login" element={<PageSuspense><Login /></PageSuspense>} />
      <Route path="/forgot-password" element={<PageSuspense><ForgotPassword /></PageSuspense>} />

      {/* Protected administrative views */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            <ErrorBoundary>
              <PageSuspense><Dashboard /></PageSuspense>
            </ErrorBoundary>
          } />
          
          <Route path="/analytics" element={
            <ErrorBoundary>
              <PageSuspense><Analytics /></PageSuspense>
            </ErrorBoundary>
          } />
          
          <Route path="/users" element={
            <ErrorBoundary>
              <PageSuspense><Users /></PageSuspense>
            </ErrorBoundary>
          } />
          
          <Route path="/reports" element={
            <ErrorBoundary>
              <PageSuspense><Reports /></PageSuspense>
            </ErrorBoundary>
          } />
          
          <Route path="/settings" element={
            <ErrorBoundary>
              <PageSuspense><Settings /></PageSuspense>
            </ErrorBoundary>
          } />
          
          <Route path="/notifications" element={
            <ErrorBoundary>
              <PageSuspense><Notifications /></PageSuspense>
            </ErrorBoundary>
          } />
        </Route>
      </Route>

      {/* Catch-all redirect block */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
