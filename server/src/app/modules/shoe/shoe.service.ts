import sendResponse from '../../../utils/sendResponse';
import QueryBuilder from '../../builder/queryBuilder'
import AppError from '../../errors/AppError';
import { TShoe } from './shoe.interface'
import { Shoe } from './shoe.model'

const createShoe = async (payload: TShoe) => {
   // Function to generate a shoe ID
   function generateShoeID() {
    const prefix = 'SHOE';
    const year = new Date().getFullYear();
    const uniqueCode = generateUniqueCode();
    return `${prefix}-${year}-${uniqueCode}`;
  }
  
  // Function to generate a random alphanumeric code
  function generateUniqueCode() {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueCode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
      uniqueCode += alphanumericCharacters.charAt(randomIndex);
    }
    return uniqueCode;
  }

  payload.authenticityCode=generateShoeID()
  const result = await Shoe.create(payload)

  return result;
}

const getAllShoes = async (query: Record<string, unknown>) => {
  const shoeQuery = new QueryBuilder(Shoe.find(), query)
    .search(['brand', 'model', 'name'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await shoeQuery.modelQuery
  return result
}

const getSingleShoe = async (id: string) => {
  const result = await Shoe.findById(id)
  return result
}
const getSingleShoeByAuthenticityCode = async (authenticityCode: string) => {
  const result = await Shoe.findOne({authenticityCode})
//  if(!result){
//     throw new AppError(404,"This shoe is not authticate")
//  }

  return result
}

const updateShoe = async (id: string, payload: Partial<TShoe>) => {
  const result = await Shoe.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteShoe = async (id: string) => {
  const result = await Shoe.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  )
  return result
}

const deleteShoesMany = async (ids: string[]) => {
  const result = await Shoe.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        isDeleted: true,
      },
    },
  )
  return result
}

export const ShoeServices = {
  createShoe,
  getAllShoes,
  getSingleShoe,
  updateShoe,
  deleteShoe,
  deleteShoesMany,
  getSingleShoeByAuthenticityCode
}
