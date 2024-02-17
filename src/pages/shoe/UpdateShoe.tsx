/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useUpdateShoeMutation } from '../../redux/features/shoe/shoeApi'
import { toast } from 'sonner'

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
  const {
    img,
    name,
    price,
    quantity,
    brand,
    _id,
    model,
    style,
    size,
    color,
    material,
    closureType,
  } = updateData

  const [updateModifiedData] = useUpdateShoeMutation()
  // console.log(error);

  const handleUpdate = (e: any) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const img = form.img.value
    const price = form.price.value
    const quantity = form.quantity.value
    const brand = form.brand.value
    const style = form.style.value
    const size = form.size.value
    const color = form.color.value
    const material = form.material.value
    const closureType = form.closureType.value

    const newUpdateData = {
      img,
      name,
      price: Number(price),
      quantity: Number(quantity),
      brand,
      model,
      style,
      size: Number(size),
      color,
      material,
      closureType,
    }

    updateModifiedData({
      id: _id,
      data: newUpdateData,
    })

    toast.success('update done')
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleUpdate} className="max-w-2xl mx-auto">
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={name}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="img"
              name="img"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={img}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={price}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={quantity}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={brand}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={model}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <input
              type="number"
              id="size"
              name="size"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={size}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Style
            </label>
            <input
              type="text"
              id="style"
              name="style"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={style}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={color}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={material}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Closure Type
            </label>
            <input
              type="text"
              id="closureType"
              name="closureType"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={closureType}
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
