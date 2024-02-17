import { Types } from "mongoose"

export type TShoePolish = {
    user_id: Types.ObjectId,
    type_of_polish: "standard" | "medium" | "premium",
    seller_id: Types.ObjectId,
    level_of_shine: "low" | "medium" | "high",
    special_instructions: string,
    status:  "pending" |"in_progress" | "complete",
    estimated_completion_time:Date,
    cost:number
}