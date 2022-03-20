import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import SimpleSidebar from 'components/Sidebar'

export const LayoutOutlet = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  return isAuthenticated ? (
    <SimpleSidebar>
      <Outlet />
    </SimpleSidebar>
  ) : (
    <Outlet />
  )
}

export const PrivateOutlet = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export const IsUserRedirectOutlet = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return !isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
