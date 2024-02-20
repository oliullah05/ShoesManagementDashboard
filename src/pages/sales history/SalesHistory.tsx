/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Progress, Space, Table } from 'antd'
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi'
import { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'

const SalesHistory = () => {
const {email}= useAppSelector(state=>state?.auth.user)||{}



  const [period, setPeriod] = useState('')
  const { data:saleData, isLoading } = useGetAllSaleQuery(period)
console.log(saleData?.data[0].seller);


const data = saleData?.data?.filter(item=>item?.buyer?.email==email)

  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

// console.log(sateData.data);

  const dataSource = data?.map((item: any) => {
    const { _id, shoeId, buyerName, quantitySold,unAuthorizedbuyerName,buyer, saleDate } = item
console.log();
    const name = shoeId ? shoeId.name : null
    const img = shoeId ? shoeId.img : null
const buyerName2 = unAuthorizedbuyerName?unAuthorizedbuyerName:buyer?.name
    return {
      key: _id,
      name,
      image: <img src={img} alt={name} style={{ width: 50, height: 50 }} />,
      quantity: quantitySold,
      buyerName2,
      saleDate,
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
