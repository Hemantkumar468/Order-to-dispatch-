import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import PartiesList from './features/masters/PartiesList';
import SkusList from './features/masters/SkusList';
import OrdersList from './features/orders/OrdersList';
import PPCPlanning from './features/ppc/PPCPlanning';
import PlanCreation from './features/planning/PlanCreation';
import Dashboard from './features/dashboard/Dashboard';
import ChallansList from './features/execution/ChallansList';
import InvoicesList from './features/ledger/InvoicesList';
import DispatchLedger from './features/ledger/DispatchLedger';
import AdminControlCenter from './features/admin/AdminControlCenter';
import OrderDetailTimeline from './features/execution/OrderDetailTimeline';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:orderId" element={<OrderDetailTimeline />} />
        <Route path="/ppc-planning" element={<PPCPlanning />} />
        <Route path="/planning" element={<PlanCreation />} />
        <Route path="/challans" element={<ChallansList />} />
        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/ledger" element={<DispatchLedger />} />
        <Route path="/skus" element={<SkusList />} />
        <Route path="/parties" element={<PartiesList />} />
        <Route path="/admin-control" element={<AdminControlCenter />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;