import QueryBuilder from "../../builder/queryBuilder"
import AppError from "../../errors/AppError";
import { Sale } from "../sale/sale.model";
import { User } from "../user/user.model";
import { TShoePolish } from "./shoePolish.interface"
import  { ShoePolish } from "./shoePolish.model"


const createshoePolish = async (payload: TShoePolish) => {
const sale =await Sale.findById(payload.saleId)
if(!sale){
  throw new AppError(404,"sale not found")
}

if(!payload.estimated_completion_time){

  const today = new Date();

  // Calculate the date for 7 days from today
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  
  // Format the result (optional)
  const formattedDate = sevenDaysLater.toISOString().split('T')[0];
  
  payload.estimated_completion_time=formattedDate
}



  const result =await  ShoePolish.create(payload)
if(!result){
  throw new AppError(404,"shoe not created")
}

 await Sale.findOneAndUpdate({_id:payload.saleId},{polishId:result._id},{new:true})



  return result
}

const getAllShoePolish = async (query: Record<string, unknown>) => {
  const shoePolishPolishQuery = new QueryBuilder(ShoePolish.find() .populate({
    path: 'saleId',
    populate: [
        {
            path: 'shoeId',
            model: 'Shoe',
        },
        {
            path: 'seller',
            model: 'User', 
            select:"-password"
        },
        {
            path: 'buyer',
            model: 'User', 
            select:"-password"
        },
    ],
}), query)
    // .search(['brand', 'model', 'name'])
    .filter()
    .sort()
    .paginate()
    .fields()

  // const result = await shoePolishPolishQuery.modelQuery
  // return result

  const result = await shoePolishPolishQuery.modelQuery;
  return result
}
const getShoePolishByEmail = async (query: Record<string, unknown>,buyerEmail:string) => {
  const shoePolishPolishQuery = new QueryBuilder(ShoePolish.find() .populate({
    path: 'saleId',
    populate: [
        {
            path: 'shoeId',
            model: 'Shoe',
        },
        {
            path: 'seller',
            model: 'User', 
        },
        {
            path: 'buyer',
            model: 'User', 
        },
    ],
}), query)
    // .search(['brand', 'model', 'name'])
    .filter()
    .sort()
    .paginate()
    .fields()

  // const result = await shoePolishPolishQuery.modelQuery
  // return result

 
   return shoePolishPolishQuery.modelQuery.where('saleId.buyer.email').equals(buyerEmail);
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
  getAllShoePolish,
  getShoePolishByEmail

}
