import { useAuth } from '../../hooks/useAuth'
import LoginPage from '../../pages/LoginPage'
import { Spinner } from '../ui/Spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner fullScreen label="Initializing" />
  }

  if (!user) return <LoginPage />

  return <>{children}</>
}
