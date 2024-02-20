/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps, Progress, Select, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import { shoePolishApi, useGetAllShoePolishQuery } from '../../redux/features/shoePolish/shoePolishApi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toast } from 'sonner'

const ShoePolishSeller = () => {
const {email} = useAppSelector(state=>state.auth.user)|| {}



  const { data:allPolishData, isLoading } = useGetAllShoePolishQuery(undefined)
  const data = allPolishData?.data?.filter(item=>item?.saleId?.seller?.email==email)

const dispatch = useAppDispatch()


  if (isLoading) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }

  const onChangeDate: DatePickerProps['onChange'] =async (date, id) => {
    const updatedData = {
        data:{estimated_completion_time:date},
        id
    }
    const res =await dispatch(shoePolishApi.endpoints.updateShoePolish.initiate( updatedData )).unwrap()
    console.log(res);
  };
  const handleChangeSelect =async (value: string,id:string) => {
    console.log(` ${value}`,id);
    const updatedData = {
        data:{status:value},
        id
    }
    const res =await dispatch(shoePolishApi.endpoints.updateShoePolish.initiate( updatedData )).unwrap()
    if(res.success){
      toast.success("status update done")
    }
  };
console.log(data,88);

  const dataSource = data?.map(({_id, saleId,status,type_of_polish,level_of_shine,estimated_completion_time }) => ({
    image: <img src={saleId?.shoeId?.img} alt={"name"} style={{ width: 50, height: 50 }} />,
    name:saleId?.shoeId?.name,
    quantity:saleId?.
    quantitySold,
    level_of_shine,
    typeOfPolish:type_of_polish,
    buyerName:saleId?.buyer?.name,
    polishStatus:<Tag className={`${status=="complete"?"bg-green-300":"bg-red-300"}`}>{status=="complete"?"complete":"not complete"}</Tag>,
    saleDate:dayjs(saleId?.saleDate).format("MM-DD-YYYY"),
    polishRequest:status!=="complete"?<Select
    className=' rounded-lg'
    defaultValue={`${status}`}
    style={{ width: 120 }}
    onChange={(data)=>handleChangeSelect(data,_id)}
    options={[
      { value: 'complete', label: 'complete' },
      { value: 'in_progress', label: 'in_progress' },
      { value: 'received', label: 'received' },
    ]}
  />:<Tag className='bg-green-300'>this request completed</Tag>
,
// `${estimated_completion_time?estimated_completion_time:"No pending polish requests"}`
    estimated_completion_time: status!=="complete"? <DatePicker defaultValue={dayjs(estimated_completion_time)} onChange={(date,dateString)=>onChangeDate(dateString,_id)} />:<Tag className='bg-green-300'>this request completed</Tag>
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
      title: 'Buyer Name',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: 'Polish Status',
      dataIndex: 'polishStatus',
      key: 'polishStatus',
    },
    {
      title: 'Type Of Polish',
      dataIndex: 'typeOfPolish',
      key: 'typeOfPolish',
    },
    {
      title: 'Level Of Shine',
      dataIndex: 'level_of_shine',
      key: 'level_of_shine',
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
    {
      title: 'Polish Request Change',
      dataIndex: 'polishRequest',
      key: 'polishRequest',
    },
    {
      title: 'Estimated Completion Time',
      dataIndex: 'estimated_completion_time',
      key: 'estimated_completion_time',
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Here are the your selling History</h1>
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

export default ShoePolishSeller
