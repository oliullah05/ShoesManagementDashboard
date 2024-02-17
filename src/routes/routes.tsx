import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AllShoes from '../pages/shoe/AllShoes'
import AddShoe from '../pages/shoe/AddShoe'
import ProtectedRoute from './ProtectedRoute'
import Sale from '../pages/sale/Sale'
import SalesHistory from '../pages/sales history/SalesHistory'
import DuplicateAndEdit from '../pages/shoe/DuplicateAndEdit'
import ProductVerification from '../pages/productVerification/ProductVerification'
import { decodeToken } from '../utils/verifyToken'

const token  = localStorage.getItem("persist:auth")
const role = JSON.parse(JSON.parse(token)?.user)?.role;
const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
      {
        path: '/',
        element: <AllShoes />,
      },
      {
        path: '/all-shoes',
        element: <AllShoes />,
      },
      {
        path: '/all-shoes/:id',
        element: <DuplicateAndEdit />,
      },
      {
        path: '/add-shoe',
        element: <AddShoe />,
      },
      {
        path: 'sales',
        element: <Sale></Sale>,
      },
      {
        path: '/sales-history',
        element: <SalesHistory></SalesHistory>,
      },
      {
        path: '/product-verification',
        element:<ProtectedRoute role='buyer'> <ProductVerification></ProductVerification></ProtectedRoute>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

export default router
