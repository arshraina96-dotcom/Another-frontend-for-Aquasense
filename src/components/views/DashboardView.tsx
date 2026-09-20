import React from 'react';
import { useApp } from '../../context/AppContext';
import { CitizenDashboardView } from '../dashboard/CitizenDashboardView';
import { AuthorityDashboardView } from '../dashboard/AuthorityDashboardView';

export const DashboardView: React.FC = () => {
  const { userRole } = useApp();

  if (userRole === 'citizen') {
    return <CitizenDashboardView />;
  }

  return <AuthorityDashboardView />;
};
