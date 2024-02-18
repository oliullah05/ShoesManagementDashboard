/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Cascader, Checkbox, Input, Modal, Progress, Space, Table, Tag } from 'antd'
import { useGetAllShoePolishQuery } from '../../redux/features/shoePolish/shoePolishApi'
import { useAppSelector } from '../../redux/hooks';
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi';
import React, { useState } from 'react';
import {

  DatePicker,
  Form,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  name:string
};
const ShoePolishBuyer = () => {
  const {email} = useAppSelector(state=>state.auth.user)
  const { data: allSaleData, isLoading } = useGetAllSaleQuery(undefined)
  // console.log(allSaleData?.data,88);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');


  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const showModal = (saleId) => {
    setIsModalOpen(true);
    // console.log(saleId,77);
  };
  const handleOk = (saleId) => {
    setIsModalOpen(false);
    console.log(saleId);
  };

  const onFinishFormData = (values: any,id) => {
    console.log('Success:', values,id);
  };
  
const handleSale= (id)=>{
  console.log("sdfd");
  console.log(id);
}

  const dataSource = data?.map(({_id,polishId, saleId,shoeId,status,
    quantitySold,seller
,     estimated_completion_time,saleDate
}) => ({
    key:saleId?._id,
    image: <img src={shoeId?.img} alt={shoeId?.img} style={{ width: 50, height: 50 }} />,
    name: shoeId.name,
    quantity:quantitySold,
    sellerName: seller.name,
    saleDate:saleDate,
    polishRequest:polishId ?<Button  color='green'>Polish in progress</Button>:<>
    <Button className='bg-[#1677ff]' type="primary" onClick={showModal}>
      Do Polish Request
    </Button>
    <Modal  destroyOnClose  okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }} title="Basic Modal" open={isModalOpen} onOk={()=>handleOk(_id)} onCancel={handleCancel}>
      {/*  */}
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: false }}
   
    onFinish={(data)=>onFinishFormData(data,_id)}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"

  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      {/* <Checkbox>Remember me</Checkbox> */}
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    {/* handleCancel */}
      <Button className='bg-[#1677ff]' onClick={()=>handleSale(_id)}  type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      {/*  */}
    </Modal></>,
    polishStatus: `${polishId ? polishId.status : "No pending polish requests"}`,
    estimated_completion_time: `${polishId ? polishId.estimated_completion_time : "No pending polish requests"}`
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
      // render: (data) => {
      //   console.log(data, 44);
      //   return <>
      //     <Button type="primary" onClick={showModal}>
      //       Open Modal
      //     </Button>
      //   </>
      // }
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
 {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <input />
          </Modal> */}
    </div>
  )
}

export default ShoePolishBuyer
