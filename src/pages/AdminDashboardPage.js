import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import AdminDashboard from '../components/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <>
      <SEOHelmet
        title="Admin Dashboard"
        description="Access the administrative dashboard for Marine Term Translations platform. Manage translations, monitor projects, and oversee platform operations."
        keywords="admin dashboard, translation management, platform administration, marine translations admin, project management"
        url="/admin-dashboard"
        type="website"
      />
      <AdminDashboard />
    </>
  );
};

export default AdminDashboardPage;