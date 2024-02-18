import { Types } from "mongoose"

export type TShoePolish = {
    saleId:Types.ObjectId,
    buyer?: Types.ObjectId,
    type_of_polish: "standard" | "medium" | "premium",
    seller: Types.ObjectId,
    level_of_shine: "low" | "medium" | "high",
    special_instructions: string,
    status:  "received" |"in_progress" | "complete",
    estimated_completion_time:Date,
    cost:number
}