import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { store } from 'store/store'
import { IsUserRedirectOutlet, LayoutOutlet, PrivateOutlet } from 'CustomRoutes'

const Login = lazy(() => import('pages/Login'))
const Dashboard = lazy(() => import('pages/Dashboard'))
const StoreApprove = lazy(() => import('pages/StoreApprove'))

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<LayoutOutlet />}>
              <Route element={<IsUserRedirectOutlet />}>
                <Route index element={<Login />} />
              </Route>
              <Route element={<PrivateOutlet />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="store-approve" element={<StoreApprove />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
)
