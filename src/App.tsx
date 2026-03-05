import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/stores/useAuthStore'
import { DataProvider } from '@/stores/useDataStore'
import { FinanceProvider } from '@/stores/useFinanceStore'

import { AuthGuard } from '@/components/AuthGuard'
import { OnboardingGuard } from '@/components/OnboardingGuard'
import { AdminGuard } from '@/components/AdminGuard'
import PublicLayout from '@/components/PublicLayout'
import Layout from '@/components/Layout'

// Lazy loaded routes
const Landing = lazy(() => import('@/pages/Landing'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Onboarding = lazy(() => import('@/pages/Onboarding'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const TripsPage = lazy(() => import('@/pages/trips/TripsPage'))
const TripDetailPage = lazy(() => import('@/pages/trips/TripDetailPage'))
const FinancesPage = lazy(() => import('@/pages/finances/FinancesPage'))
const GaragePage = lazy(() => import('@/pages/garage/GaragePage'))
const AdminPage = lazy(() => import('@/pages/admin/AdminPage'))

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="nomadwise-theme">
    <AuthProvider>
      <DataProvider>
        <FinanceProvider>
          <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes via PublicLayout (includes its own Suspense) */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Landing />} />
                </Route>

                {/* Protected Environment */}
                <Route element={<AuthGuard />}>
                  <Route element={<OnboardingGuard />}>
                    {/* Dedicated Onboarding Route */}
                    <Route
                      path="/onboarding"
                      element={
                        <Suspense fallback={null}>
                          <Onboarding />
                        </Suspense>
                      }
                    />

                    {/* Main App Authenticated Layout (includes its own Suspense) */}
                    <Route element={<Layout />}>
                      <Route path="/app">
                        <Route index element={<Navigate to="/app/dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="trips" element={<TripsPage />} />
                        <Route path="trips/:id" element={<TripDetailPage />} />
                        <Route path="finances" element={<FinancesPage />} />
                        <Route path="garage" element={<GaragePage />} />
                      </Route>

                      {/* Admin Specific Protected Route */}
                      <Route element={<AdminGuard />}>
                        <Route path="/admin" element={<AdminPage />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>

                <Route
                  path="*"
                  element={
                    <Suspense fallback={null}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </FinanceProvider>
      </DataProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
