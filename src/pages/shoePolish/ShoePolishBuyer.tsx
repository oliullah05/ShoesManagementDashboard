/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Progress, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetAllSaleQuery } from '../../redux/features/sale/saleApi';
import { shoePolishApi } from '../../redux/features/shoePolish/shoePolishApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
type FieldType = {
  special_instructions?: string;
  type_of_polish?: string;
  remember?: string;
  level_of_shine:string
  name: string
};
const ShoePolishBuyer = () => {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state?.auth?.user) || {}
  const { data: allSaleData, isLoading } = useGetAllSaleQuery(undefined)
  // console.log(allSaleData?.data,88);
  const [saleId, setSaleId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const data:any = allSaleData?.data?.filter((item: { buyer: { email: string | undefined; }; }) => item?.buyer?.email == email)


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
  const showModal = (saleId: string) => {
    setSaleId(saleId);
    setIsModalOpen(true);
  };
  const handleOk = (data:any, saleId:string) => {
    setIsModalOpen(false);
    console.log(data, saleId, 77);
  };




  // const handleSale = (id) => {
  //   console.log("sdfd");
  //   console.log(id);
  // }


  const onFinish = async (fieldsValue: FieldType) => {
    const shoePolishdata = { ...fieldsValue, saleId }
    const { level_of_shine,
      type_of_polish, special_instructions } = shoePolishdata;

      const modifiedshoePolishData: {
        level_of_shine: string;
        saleId: string | null;
        type_of_polish: string | undefined;
        special_instructions?: string;
      } = { level_of_shine, saleId, type_of_polish };

    if (special_instructions) {
      modifiedshoePolishData.special_instructions = special_instructions 
    }

    const res = await dispatch(shoePolishApi.endpoints.createShoePolish.initiate(modifiedshoePolishData)).unwrap()

    console.log(res);

    if (res.success) {
      toast.success("Polish request send")
    }

    setIsModalOpen(false);
  };


  const dataSource:any = data?.map(({ _id, polishId,  shoeId,
    quantitySold, seller
    ,  saleDate
  }:{
    _id: string;
    polishId?: { status: string; estimated_completion_time: string };
    saleId: string;
    shoeId: { img: string; name: string };
    status: string;
    quantitySold: number;
    seller?: { name: string };
    estimated_completion_time: string;
    saleDate: string;
  }) => ({
    key: _id,
    image: <img src={shoeId?.img} alt={shoeId?.img} style={{ width: 50, height: 50 }} />,
    name: shoeId.name,
    quantity: quantitySold,
    sellerName: seller?.name,
    saleDate: dayjs(saleDate).format("MM-DD-YYYY"),
    polishRequest: polishId?.status == "in_progress" || polishId?.status == "received" ? <Button color='green'>Polish in progress</Button> : <>
      <Button className='bg-[#1677ff]' type="primary" onClick={() => showModal(_id)}>
        Do Polish Request
      </Button>
      <Modal destroyOnClose okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }} title="Basic Modal" open={isModalOpen}
        onOk={(data) => handleOk(data, _id)}
        onCancel={handleCancel}>
        {/*  */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item<FieldType> label="Type Of Polish" name="type_of_polish"
            rules={[{ required: true, message: 'Please select type of polish!' }]} >
            <Select>
              <Select.Option value="standard">Standard</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="premium">Premium</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType> label="Level Of Shine" name="level_of_shine"
            rules={[{ required: true, message: 'Please select level of shine!' }]} >
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType> label="Special Instructions" name={"special_instructions"}>
            <Input.TextArea />

          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className='bg-[#1677ff]' type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/*  */}
      </Modal></>,
    polishStatus: `${polishId ? polishId.status : "No pending polish requests"}`,
    estimated_completion_time: `${polishId ? dayjs(polishId.estimated_completion_time).format("MM-DD-YYYY") : "No pending polish requests"}`
  }));


  //   <Form.Item label="Type Of Polish" name="type_of_polish" required {...config}>
  //   <Input />
  // </Form.Item>
  // <Form.Item label="Level Of Shine" name="level_of_shine" required {...config}>
  //   <Input />
  // </Form.Item>
  // <Form.Item label="Select" required {...config}>
  //   <Select>
  //     <Select.Option value="demo">Demo</Select.Option>
  //   </Select>
  // </Form.Item>

  // <Form.Item label="DatePicker">
  //   <DatePicker />
  // </Form.Item>
  // <Form.Item label="InputNumber">
  //   <InputNumber />
  // </Form.Item>






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
