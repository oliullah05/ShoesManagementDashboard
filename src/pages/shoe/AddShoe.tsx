import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd'
import { toast } from 'sonner'
import { useAddShoeMutation } from '../../redux/features/shoe/shoeApi'

const AddShoe = () => {
  const [form] = Form.useForm()

  const [addShoe, { error }] = useAddShoeMutation()

  if (error) {
    return toast.error('Something went wrong')
  }

  const onFinish = async (data: FormData) => {
    try {
      await addShoe(data)
      form.resetFields()
      toast.success('shoe created done')
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong')
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col
        xs={24}
        sm={20}
        md={18}
        lg={16}
        xl={14}
        xxl={12}
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 24 }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter the shoe name' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: 'Please enter the shoe price' },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: 'Please enter the shoe quantity' },
                  { type: 'number', message: 'Please enter a valid number' },
                  {
                    validator: (_, value) =>
                      value >= 0
                        ? Promise.resolve()
                        : Promise.reject('Quantity must be a positive number'),
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Image URL"
                name="img"
                rules={[
                  { required: true, message: 'Please enter the image URL' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Model"
                name="model"
                rules={[{ required: true, message: 'Please enter the model' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: 'Please enter the brand' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Release Date" name="releaseDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Style" name="style">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Size" name="size">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Color" name="color">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Material" name="material">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Closure Type" name="closureType">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col className="" span={24}>
              <Form.Item
                className=" flex justify-center items-center mt-4 me-4"
                wrapperCol={{ offset: 6, span: 18 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-800"
                  //  loading={mutation.isLoading}
                >
                  Add Shoe
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default AddShoe
