/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Progress, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi'
import { useAppSelector } from '../../redux/hooks'

const SalesHistory = () => {
  const [data, setData] = useState<any[]>([])

  const { email } = useAppSelector(state => state?.auth?.user) || {}
  // console.log(data, 88);
  // const [data,setData]=useState([])

  const [period, setPeriod] = useState('')
 
  const { data: saleData, isLoading } = useGetAllSaleQuery(period)
  // console.log(saleData?.data[6].unAuthorizedbuyerName);
// console.log(saleData.data);
  useEffect(() => {
    if (!saleData || !saleData.data) {
      // Handle the case where saleData or saleData.data is undefined
      setData([]);
      return;
    }
    // Use useEffect to update the state after the initial render
    const unAuthorizedData = saleData && saleData?.data?.filter((item: { unAuthorizedbuyerName: any }) => item?.unAuthorizedbuyerName);
    const filteredData =saleData && saleData?.data?.filter((item: { seller: { email: string | undefined } }) => item?.seller?.email === email);

    // Merge the arrays using the spread operator
    const mergedData = [...filteredData, ...unAuthorizedData];
  
    setData(mergedData);
  }, [saleData, email]);



  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  // console.log(sateData.data);

  const dataSource = data?.map((item: any) => {
    const { _id, shoeId,  quantitySold, unAuthorizedbuyerName, buyer, saleDate } = item
    console.log();
    const name = shoeId ? shoeId.name : null
    const img = shoeId ? shoeId.img : null
    const buyerName2 = unAuthorizedbuyerName ? unAuthorizedbuyerName : buyer?.name
    return {
      key: _id,
      name,
      image: <img src={img} alt={name} style={{ width: 50, height: 50 }} />,
      quantity: quantitySold,
      buyerName2,
      saleDate
    }
  })

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
      title: 'Buyer Name',
      dataIndex: 'buyerName2',
      key: 'buyerName',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Here are the Sales History</h1>
      <Flex wrap="wrap" gap="small">
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
      </Flex>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

export default SalesHistory
