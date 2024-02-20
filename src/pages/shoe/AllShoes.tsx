/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  Col,
  Modal,
  Progress,
  Row,
  Space,
  Tooltip
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import {
  useGetAllShoesQuery
} from '../../redux/features/shoe/shoeApi'
import UpdateShoe from './UpdateShoe'
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

const AllShoes = () => {
  // const [selectedData, setSelectedData] = useState([] as string[])
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

  // console.log(selectedData);

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

  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [deleteShoe] = useDeleteShoeMutation()

  const handleFilter = (e: any) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    // setDynamicURL(generateDynamicURL());
  }

  useEffect(() => {
    setDynamicURL(generateDynamicURL())
  }, [formData])

  const { data, isLoading } = useGetAllShoesQuery(dynamicURL)

  const [updateData, setUpdateData] = useState('')

  const [arrow] = useState('Show')

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false
    }

    if (arrow === 'Show') {
      return true
    }

    return {
      pointAtCenter: true,
    }
  }, [arrow])
  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  // console.log(updateData);
  // const handleDelate = async (id: string) => {
  //   await deleteShoe(id)

  //   toast.success('shoe deleted successfull')
  // }

  const showModal = (item: string) => {
    setIsModalOpen(true)
    setUpdateData(item)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  return (
    <>
      <section>
        {/* Filter options */}
        <form onChange={handleFilter} className="mt-8">
          <h2 className="text-xl font-bold mb-4">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
            </div>

            {/* Release Date Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Release Date
              </label>
              <input
                type="text"
                name="releaseDate"
                placeholder="Filter by Date"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search by Brand ,Model ,Name"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Size Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="text"
                name="size"
                placeholder="Filter by Size"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Style Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Style
              </label>
              <input
                type="text"
                name="style"
                placeholder="Filter by Style"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Color Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                name="color"
                placeholder="Filter by Color"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Model Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="Filter by Model"
                className="w-full p-2 border rounded"
              />
            </div>
            {/* Add more filters as needed */}
          </div>
   
        </form>
      </section>

      <Row gutter={[16, 16]}>
        {data?.data?.map((item: any, index: number) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
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
                // <EditOutlined key="edit" />,

                <Tooltip
                  placement="top"
                  title={'edit shoe'}
                  arrow={mergedArrow}
                >
                  {' '}
                  <Button
                    className="bg-green-800"
                    type="primary"
                    onClick={() => showModal(item)}
                  >
                    Buy Now
                    {/* <EditOutlined key="edit" /> */}
                  </Button>
                </Tooltip>,

                // <Tooltip
                //   placement="top"
                //   title={'edit and duplicate'}
                //   arrow={mergedArrow}
                // >
                //   <Link to={`/all-shoes/${item._id}`}>
                //     <CopyOutlined key="duplicate" />
                //   </Link>{' '}
                // </Tooltip>,

                // <Tooltip placement="top" title={'delete'} arrow={mergedArrow}>
                //   {' '}
                //   <DeleteOutlined
                //     onClick={() => handleDelate(item._id)}
                //     key="delete"
                //   />
                // </Tooltip>,
              ]}
            >
              {/* <Checkbox
                checked={selectedData.includes(item._id)}
                style={{ display: 'flex', justifyContent: 'end' }}
                onClick={() => handleSendId(item._id)}
              >
                Select
              </Checkbox> */}

              <Meta
                avatar={<Avatar src={item?.img} />}
                title={item?.name}
                description={`Price: $${item?.price.toFixed(2)}`}
              />
              <div style={{ marginTop: 10 }}>
                <p>Brand: {item.brand}</p>
                <p>Model: {item.model}</p>
                <p>Quantity: {item.quantity}</p>
                <p>ID: {item?.authenticityCode}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        className=""
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        destroyOnClose
      >
        <UpdateShoe updateData={updateData}></UpdateShoe>
      </Modal>
    </>
  )
}

export default AllShoes