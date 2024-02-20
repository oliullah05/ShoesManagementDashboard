/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useRegisterMutation } from '../redux/features/auth/authApi'

const Register = () => {
  const navigate = useNavigate()
  const [register] = useRegisterMutation()

  const onFinish = async (data: FormData) => {
    // console.log("Received values:", data);

    try {
      const toastId = toast.loading('Register')
      const res: any = await register(data)
      if (res?.error) {
        return toast.error(res?.error?.data?.message)
      }
      toast.success('Registration Successful', { id: toastId })
      navigate('/login')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col
        span={8}
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 24 }}
      >
        <Form
          name="register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h2
            className="text-2xl bg-transparent"
            style={{ textAlign: 'center', marginBottom: 24 }}
          >
            Register
          </h2>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
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
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long',
              },
              {
                max: 20,
                message: 'Password must be at most 20 characters long',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item  name="role"
            rules={[{ required: true, message: 'Please select your role!' }]} >
            <Select placeholder="Please Select Your Role!">
              <Select.Option value="buyer">Buyer</Select.Option>
              <Select.Option value="seller">Seller</Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button bg-[#1677ff]"
              block
            >
              Register
            </Button>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              Already have an account? <Link to={'/login'}>Login now!</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
