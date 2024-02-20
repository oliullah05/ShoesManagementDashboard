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
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const { Header, Content, Sider } = Layout

const MainLayout = () => {
  const user = useAppSelector(state=>state?.auth) || {}

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
          key: 'My Shoes',
          label: <NavLink to={'/my-shoes'}>My Shoes</NavLink>,
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
      key: 'Buys History',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/buys-history'}>Buys History</NavLink>,
    },
    {
      key: 'Product Verification',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/product-verification'}>Product Verification</NavLink>,
    },
    {
      key: 'Polish Request-buyer',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/polish-request-buyer'}>Buyer Polish Req.</NavLink>,
    },
    {
      key: 'Polish Request',
      icon: <HistoryOutlined />,
      label: <NavLink to={'/polish-request-seller'}>Seller Polish Req.</NavLink>,
    },

    {
      key: 'Logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    }
  ]


// if(user?.user?.role=="buyer"){
// items.push(   ,)
// }

// if(user?.user?.role=="seller"){
// items.push(
//   ,



// )
// }


items.push( )



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
