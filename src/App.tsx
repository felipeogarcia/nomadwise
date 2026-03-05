import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/stores/useAuthStore'
import { DataProvider } from '@/stores/useDataStore'

import { AuthGuard } from '@/components/AuthGuard'
import PublicLayout from '@/components/PublicLayout'
import Layout from '@/components/Layout'

import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import Onboarding from '@/pages/Onboarding'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import TripsPage from '@/pages/trips/TripsPage'
import GaragePage from '@/pages/garage/GaragePage'
import AdminPage from '@/pages/admin/AdminPage'

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="nomadwise-theme">
    <AuthProvider>
      <DataProvider>
        <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
              </Route>

              {/* Protected Routes Wrapper */}
              <Route element={<AuthGuard />}>
                {/* Onboarding uses its own simple layout or PublicLayout, let's use Layout without sidebar */}
                <Route element={<Layout />}>
                  <Route path="/onboarding" element={<Onboarding />} />

                  {/* Main App Routes */}
                  <Route path="/app">
                    <Route index element={<Navigate to="/app/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="trips" element={<TripsPage />} />
                    <Route path="garage" element={<GaragePage />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
