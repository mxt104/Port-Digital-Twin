import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from '@/layouts/AppShell'
import DashboardPage from '@/pages/Dashboard'
import ContainerYardPage from '@/pages/ContainerYard'
import AnalyticsPage from '@/pages/Analytics'
import PortMapPage from '@/pages/PortMap'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="container-yard" element={<ContainerYardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="port-map" element={<PortMapPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}
