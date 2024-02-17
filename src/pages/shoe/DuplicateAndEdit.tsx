/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Progress, Space } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  useAddShoeMutation,
  useGetSingleShoeQuery,
} from '../../redux/features/shoe/shoeApi'

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };

type FieldType = {
  name?: string
  img?: string
  price?: string
  quantity?: string
  brand?: string
  model?: string
  size?: string
  style?: string
  color?: string
  material?: string
  closureType?: string
}

const DuplicateAndEdit: React.FC = () => {
  const id = useParams()
  const [addShoe] = useAddShoeMutation()
  const { data } = useGetSingleShoeQuery(id)
  const showData: { data: any } = data
  if (!data?.data) {
    return (
      <Space className="h-screen w-full flex justify-center items-center" wrap>
        <Progress type="circle" percent={75} />
      </Space>
    )
  }
  const {
    img,
    name,
    price,
    quantity,
    brand,
    model,
    style,
    size,
    color,
    material,
    closureType,
  } = showData && showData.data

  const onFinish = async (values: any) => {
    try {
      const {
        img,
        name,
        price,
        quantity,
        releaseDate,
        brand,
        model,
        style,
        size,
        color,
        material,
        closureType,
      } = values

      await addShoe({
        img,
        name,
        price: Number(price),
        quantity: Number(quantity),
        releaseDate,
        brand,
        model,
        style,
        size: Number(size),
        color,
        material,
        closureType,
      })

      toast.success('shoe created done')
    } catch (err) {
      // console.log(error);
      toast.error('Something went wrong')
    }
  }

  return (
    <section className="h-screen w-full flex justify-center items-center sm:mt-20">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', maxWidth: '1000px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onChange={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <section className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input product name!' }]}
            initialValue={name}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="imgUrl"
            name="img"
            rules={[{ required: true, message: 'Please input your img url!' }]}
            initialValue={img}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
            initialValue={price}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item<FieldType>
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input your quantity' }]}
            initialValue={quantity}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item<FieldType>
            label="brand"
            name="brand"
            rules={[{ required: true, message: 'Please input your brand!' }]}
            initialValue={brand}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="model"
            name="model"
            rules={[{ required: true, message: 'Please input your model!' }]}
            initialValue={model}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="size"
            name="size"
            rules={[{ required: true, message: 'Please input your size!' }]}
            initialValue={size}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item<FieldType> label="style" name="style" initialValue={style}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="color" name="color" initialValue={color}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="material"
            name="material"
            initialValue={material}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="closureType"
            name="closureType"
            initialValue={closureType}
          >
            <Input />
          </Form.Item>
        </section>

        <Form.Item
          className=" flex justify-center items-center mt-10 sm:mt-0"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <div className="">
            <Button className="bg-green-900 " type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  )
}

export default DuplicateAndEdit
