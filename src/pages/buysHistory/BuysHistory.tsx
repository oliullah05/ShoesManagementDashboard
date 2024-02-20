/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Progress, Space, Table } from 'antd'
import { useState } from 'react'
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi'
import { useAppSelector } from '../../redux/hooks'


const BuysHistory = () => {
  const { email } = useAppSelector(state => state?.auth.user) || {}


  const [period, setPeriod] = useState('')
  const { data: sateData, isLoading } = useGetAllSaleQuery(period)
// console.log(sateData?.data[0].buyer?.email);
  const data = sateData?.data?.filter((item: { buyer: { email: string | undefined } }) => item.buyer?.email==email)
console.log(data);
console.log(email,99);
  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  const dataSource = data?.map((item: any) => {
    const { _id, shoeId, seller, quantitySold, saleDate } = item
    console.log(seller?.name, 77);
    const name = shoeId ? shoeId.name : null
    const img = shoeId ? shoeId.img : null
  const sellerName = seller?.name?seller?.name : item?.unAuthorizedbuyerName;
    return {
      key: _id,
      name,
      image: <img src={img} alt={name} style={{ width: 50, height: 50 }} />,
      quantity: quantitySold,
      sellerName,
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
      title: 'Seller Name',
      dataIndex: 'sellerName',
      key: 'sellerName',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
  ]

  return (
    <div>

      <h1 style={{ marginBottom: '20px' }}>Here are the Buys History</h1>
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

export default BuysHistory
