import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, Row, Col } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/features/auth/authApi'
import { TUser, setUser } from '../redux/features/auth/authSlice'
import { decodeToken } from '../utils/verifyToken'
import { toast } from 'sonner'
import { useAppDispatch } from '../redux/hooks'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const onFinish = async (data: FormData) => {
    // console.log("Received values:", data);

    const toastId = toast.loading('Logging in')
    try {
      const res = await login(data).unwrap()
      const user = decodeToken(res.data.accessToken) as TUser

      dispatch(setUser({ user, token: res.data.accessToken }))
      toast.success('Logged in', { id: toastId })
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  return (
    <Row className="flex h-screen justify-center items-center">
      <Col
        span={8}
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 24 }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h2
            className="text-2xl bg-transparent"
            style={{ textAlign: 'center', marginBottom: 24 }}
          >
            Log in
          </h2>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-[#1677ff]"
              block
            >
              Log in
            </Button>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              Don't have an account? <Link to={'/register'}>Register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
