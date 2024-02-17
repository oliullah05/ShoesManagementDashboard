import {
  BranchesOutlined,
  DesktopOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { logout } from '../../redux/features/auth/authSlice'
import { useAppDispatch } from '../../redux/hooks'
import ProductVerification from '../../pages/productVerification/ProductVerification'

const { Header, Content, Sider } = Layout

const MainLayout = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const items = [
    {
      key: 'Shoes Management',
      icon: <BranchesOutlined />,
      label: 'Shoes Management',
      children: [
        {
          key: 'All Shoes',
          label: <NavLink to={'/all-shoes'}>All Shoes</NavLink>,
        },
        {
          key: 'Add New Shoe',
          label: <NavLink to={'add-shoe'}>Add New Shoe</NavLink>,
        },
      ],
    },
    {
      key: 'Sales Management',
      icon: <DesktopOutlined />,
      label: <NavLink to={'/sales'}>Sales Management</NavLink>,
    },
    {
      key: 'Sales History',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/sales-history'}>Sales History</NavLink>,
    },
    {
      key: 'Product Verification',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/product-verification'}>Product Verification</NavLink>,
    },

    {
      key: 'Logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="demo-logo-vertical"
          style={{ padding: '16px', textAlign: 'center' }}
        >
          <NavLink to={'/'}>
            <HomeOutlined style={{ fontSize: '2rem', color: '#fff' }} />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['Shoes Management']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#001529', padding: 0 }}>
          <h1
            style={{
              color: 'white',
              textAlign: 'center',
              margin: 0,
              fontSize: "30px",
              fontWeight: "bold"
            }}
          >
            Shoes Management Dashboard
          </h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
