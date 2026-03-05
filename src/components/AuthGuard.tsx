import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'

export function AuthGuard() {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (user?.status === 'pending_profile' && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  if (user?.status === 'active' && location.pathname === '/onboarding') {
    return <Navigate to="/app/dashboard" replace />
  }

  if (location.pathname.startsWith('/admin') && user?.role !== 0) {
    return <Navigate to="/app/dashboard" replace />
  }

  return <Outlet />
}
