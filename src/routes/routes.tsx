import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductVerification from '../pages/productVerification/ProductVerification'
import Sale from '../pages/sale/Sale'
import SalesHistory from '../pages/sales history/SalesHistory'
import AddShoe from '../pages/shoe/AddShoe'
import AllShoes from '../pages/shoe/AllShoes'
import DuplicateAndEdit from '../pages/shoe/DuplicateAndEdit'
import ProtectedRoute from './ProtectedRoute'
import ShoePolishBuyer from '../pages/shoePolish/ShoePolishBuyer'
import ShoePolishSeller from '../pages/shoePolish/ShoePolishSeller'

// const token  = localStorage.getItem("persist:auth")
// const role = JSON.parse(JSON.parse(token)?.user)?.role;
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
        path: 'sales-history',
        element: <SalesHistory></SalesHistory>,
      },
      {
        path: 'product-verification',
        element: <ProductVerification></ProductVerification>,
      },
      {
        path: 'polish-request-buyer',
        element: <ProtectedRoute role='buyer'><ShoePolishBuyer></ShoePolishBuyer></ProtectedRoute>,
      },
      {
        path: 'polish-request-seller',
        element:<ProtectedRoute role='seller'> <ShoePolishSeller></ShoePolishSeller></ProtectedRoute>,
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
