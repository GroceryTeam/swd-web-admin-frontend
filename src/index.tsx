import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { store } from 'store/store'

const Login = lazy(() => import('pages/Login'))
const Dashboard = lazy(() => import('pages/Dashboard'))

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
)
