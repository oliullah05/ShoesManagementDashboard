/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, Progress, Space, Table, Tag } from 'antd'
import { useGetAllShoePolishQuery } from '../../redux/features/shoePolish/shoePolishApi'
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi';

const ShoePolishBuyer = () => {
  const {email} = useAppSelector(state=>state.auth.user)
  const { data: allSaleData, isLoading } = useGetAllSaleQuery(undefined)
  console.log(allSaleData?.data,88);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = allSaleData?.data?.filter(item => item?.buyer?.email == email);




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
  // `${status?"Your Polish Is Pending":"Send Polish Request"}`




  const dataSource = data?.map(({_id, saleId,shoeId,status,
    quantitySold,seller
,     estimated_completion_time,saleDate
}) => ({
    key:saleId?._id,
    image: <img src={shoeId?.img} alt={shoeId?.img} style={{ width: 50, height: 50 }} />,
    name: shoeId.name,
    quantity:quantitySold,
    sellerName: seller.name,
    saleDate:saleDate,
    // polishRequest:status ?<Button color='green'>Polish Requested</Button>:<Button color='green'>Send Polish Request</Button>,
    polishStatus: `${status ? status : "No pending polish requests"}`,
    estimated_completion_time: `${estimated_completion_time ? estimated_completion_time : "No pending polish requests"}`
  }));



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };





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
      // dataIndex: 'polishRequest',
      key: 'polishRequestX',
      render: (data) => {
        console.log(data, 44);
        return <>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
        </>
      }
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
 <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <input />
          </Modal>
    </div>
  )
}

export default ShoePolishBuyer