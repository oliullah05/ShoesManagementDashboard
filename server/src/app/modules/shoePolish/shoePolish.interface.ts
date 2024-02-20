import { Types } from "mongoose"

export type TShoePolish = {
    saleId:Types.ObjectId,
    type_of_polish: "standard" | "medium" | "premium",
    level_of_shine: "low" | "medium" | "high",
    special_instructions?: string,
    status:  "received" |"in_progress" | "complete",
    estimated_completion_time?:Date|string,
    cost?:number,
}