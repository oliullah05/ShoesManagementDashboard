import QueryBuilder from "../../builder/queryBuilder"
import { TShoePolish } from "./shoePolish.interface"
import  { ShoePolish } from "./shoePolish.model"


const createshoePolish = async (payload: TShoePolish) => {
  const result = await ShoePolish.create(payload)
  return result
}

const getAllShoePolish = async (query: Record<string, unknown>) => {
  const shoePolishPolishQuery = new QueryBuilder(ShoePolish.find(), query)
    // .search(['brand', 'model', 'name'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await shoePolishPolishQuery.modelQuery
  return result
}

const getSingleShoePolish = async (id: string) => {
  const result = await ShoePolish.findById(id)
  return result
}

const updateShoePolish = async (id: string, payload: Partial<TShoePolish>) => {
  const result = await ShoePolish.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}


export const shoePolishPolishServices = {
  createshoePolish,
  getSingleShoePolish,
  updateShoePolish,
  getAllShoePolish

}
