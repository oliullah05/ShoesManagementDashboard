/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Row,
  Space,
} from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useCreateSaleMutation } from '../../redux/features/sale/saleApi'
import { useGetAllShoesQuery } from '../../redux/features/shoe/shoeApi'
interface FormData {
  minPrice: string
  maxPrice: string
  releaseDate: string
  searchTerm: string
  size: string
  style: string
  color: string
  model: string
  [key: string]: string // Index signature
}
const { Meta } = Card

const Sale = () => {

  const [dynamicURL, setDynamicURL] = useState('')
  const [formData, setFormData] = useState<FormData>({
    minPrice: '',
    maxPrice: '',
    releaseDate: '',
    searchTerm: '',
    size: '',
    style: '',
    color: '',
    model: '',
  })


  const generateDynamicURL = () => {
    const baseEndpoint = ''
    const queryParams = []

    for (const property in formData) {
      if (formData[property]) {
        queryParams.push(
          `${property}=${encodeURIComponent(formData[property])}`,
        )
      }
    }

    if (queryParams.length > 0) {
      const queryString = queryParams.join('&')
      return `${baseEndpoint}?${queryString}`
    }

    return baseEndpoint
  }

  const handleFilter = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    setDynamicURL(generateDynamicURL())
  }

  useEffect(() => {
    setDynamicURL(generateDynamicURL())
  }, [formData])


  const [createSale] = useCreateSaleMutation()

  // console.log(error);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const shoeData = {
        shoeId: values.shoeId,
        price: values.price,
        quantitySold: values.quantitySold,
        saleDate: values.saleDate,
        seller: values.createdBy
      }

      const res = await createSale(shoeData)


      setIsModalOpen(false)
      form.resetFields()
      if (res?.data?.success) {
        toast.success(res?.data?.message, { duration: 2000 })
      }
      else if (res?.error?.data?.success === false) {
        toast.error(res?.error?.data?.message, { duration: 3000 })
      }

      // toast.success(res?.error?.data?.message)
    } catch (errorInfo) {
      toast.error('Something went wrong')
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const { data, isLoading } = useGetAllShoesQuery(dynamicURL)

console.log(data?.data,77);


  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  const filteredData = data?.data?.filter((item: any) => item.quantity > 0)

  return (
    <>
      <form
        onSubmit={handleFilter}
        onChange={handleFilter}
        className="flex items-center mb-8"
      >
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by Brand ,Model ,Name"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
              />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
      </form>

      <Row gutter={[16, 16]}>
        {filteredData?.map((item: any) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} key={item._id}>
            <Card
              style={{
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              cover={
                <img
                  alt={item?.name}
                  src={item?.img}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
              actions={[
                <div
                  onClick={() => {
                    form.setFieldsValue({ shoeId: item._id, createdBy: item.createdBy, price: item.price })
                    showModal()
                  }}
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    background: 'black',
                    color: 'white',
                    borderRadius: '4px',
                  }}
                  key="sale"
                >
                  Buy
                </div>,
              ]}
            >
              <Meta
                avatar={<Avatar src={item?.img} />}
                title={item?.name}
                description={`Price: $${item?.price.toFixed(2)}`}
              />
              <div style={{ marginTop: 10 }}>
                <p>Brand: {item.brand}</p>
                <p>Model: {item.model}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Form form={form} onFinish={handleOk}>
        <Modal
          title="Give Sale Details"
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleCancel}
        >
          <Form.Item name="shoeId" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="createdBy" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="price" hidden>
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Buyer Name"
            name="buyerName"
            rules={[{ required: true, message: 'Please enter the buyer name' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Quantity"
            name="quantitySold"
            rules={[
              { required: true, message: 'Please enter the shoe quantity' },
              { type: 'number', message: 'Please enter a valid number' },
              {
                validator: (_, value) =>
                  value > 0
                    ? Promise.resolve()
                    : Promise.reject('Quantity must be a positive number'),
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Sale Date"
            name="saleDate"
            rules={[{ required: true, message: 'Please enter the sale date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Modal>
      </Form>
    </>
  )
}

export default Sale






