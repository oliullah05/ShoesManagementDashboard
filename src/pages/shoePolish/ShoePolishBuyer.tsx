/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress, Space, Table } from 'antd'
import { useGetAllShoePolishQuery } from '../../redux/features/shoePolish/shoePolishApi'

const ShoePolishBuyer = () => {
  const { data:allPolishData, isLoading } = useGetAllShoePolishQuery(undefined)

  const data = allPolishData?.data?.filter(item=>item.saleId.buyer.email=="oli@oli.com");
console.log(data);



  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  // const dataSource = data?.data?.map((item: any) => {
  //   const { _id ,saleId} = item


  //   // const img = item.saleId.shoeId.img;

  //   return {
  //     key: _id,
  //     // name,
  //     image: <img src={saleId.shoeId.img} alt={"name"} style={{ width: 50, height: 50 }} />,
  //     // quantity: quantitySold,
  //     // buyerName,
  //     // saleDate,
  //   }
  // })

  const dataSource = data.map(({ saleId,status,estimated_completion_time }) => ({
    image: <img src={saleId.shoeId.img} alt={"name"} style={{ width: 50, height: 50 }} />,
    name:saleId.shoeId.name,
    quantity:saleId.
    quantitySold,
    sellerName:saleId.seller.name,
    saleDate:saleId.saleDate,
    polishRequest:`${status?status:"Send Polish Request"}`,
    polishStatus:`${status?status:"No pending polish requests"}`,
    estimated_completion_time:`${estimated_completion_time?estimated_completion_time:"No pending polish requests"}`
  }));

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Seller Name',
      dataIndex: 'sellerName',
      key: 'sellerName',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
    {
      title: 'Polish Request',
      dataIndex: 'polishRequest',
      key: 'polishRequest',
    },
    {
      title: 'Polish Status',
      dataIndex: 'polishStatus',
      key: 'polishStatus',
    },
    {
      title: 'Estimated Completion Time',
      dataIndex: 'estimated_completion_time',
      key: 'estimated_completion_time',
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Here are the your buying History</h1>
      {/* <Flex wrap="wrap" gap="small">
        <Button
          className="bg-[#1677ff]"
          onClick={() => setPeriod('')}
          type="primary"
        >
          All
        </Button>
        <Button
          className="bg-[#1677ff]"
          onClick={() => setPeriod('daily')}
          type="primary"
        >
          Daily
        </Button>
        <Button
          className="bg-[#1677ff]"
          onClick={() => setPeriod('weekly')}
          type="primary"
        >
          Weekly
        </Button>
        <Button
          className="bg-[#1677ff]"
          onClick={() => setPeriod('monthly')}
          type="primary"
        >
          Monthly
        </Button>
        <Button
          className="bg-[#1677ff]"
          onClick={() => setPeriod('yearly')}
          type="primary"
        >
          Yearly
        </Button>
      </Flex> */}
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

export default ShoePolishBuyer
