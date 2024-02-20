/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { toast } from 'sonner'
import { saleApi } from '../../redux/features/sale/saleApi'
import { useAppDispatch } from '../../redux/hooks'

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };

type TFieldType = {
  updateData?: string
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

const UpdateShoe: React.FC<TFieldType> = ({ updateData }: any) => {

const dispatch = useAppDispatch()

// console.log(updateData,77);
  // console.log(error);

  const handleUpdate = async(e: any) => {
    e.preventDefault()
    const form = e.target

    const quantity = form.quantity.value;
    const seller = updateData?.createdBy?._id;
    const shoeId = updateData?._id;
    const saleData = {
      quantitySold: Number(quantity),
      seller,
      shoeId,
      price:updateData.price,
      saleDate:new Date()
    }

 const res =  await  dispatch(saleApi.endpoints.createSale.initiate(saleData)).unwrap()
console.log(res);
    toast.success('update done')
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleUpdate} className="max-w-2xl mx-auto">
        <section className="grid grid-cols-1 gap-4">






          <div className=" flex gap-4 justify-center items-center sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            // defaultValue={quantity}
            />
          </div>


        </section>

        <div className="mt-4 flex justify-center items-center">
          <button
            type="submit"
            className="p-2 bg-green-900 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdateShoe
