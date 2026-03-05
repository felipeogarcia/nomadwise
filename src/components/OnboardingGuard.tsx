import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'

export function OnboardingGuard() {
  const { user } = useAuthStore()
  const location = useLocation()

  // Redirect to onboarding if profile is pending and not already on the onboarding page
  if (user?.status === 'pending_profile' && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  // Prevent accessing onboarding if profile is already active
  if (user?.status === 'active' && location.pathname === '/onboarding') {
    return <Navigate to="/app/dashboard" replace />
  }

  return <Outlet />
}
