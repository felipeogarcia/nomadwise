import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'

export function AdminGuard() {
  const { user } = useAuthStore()

  if (user?.role !== 0) {
    return <Navigate to="/app/dashboard" replace />
  }

  return <Outlet />
}
