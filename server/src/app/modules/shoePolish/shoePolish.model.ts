import mongoose, { Schema } from "mongoose";

import { TShoePolish } from "./shoePolish.interface";

const TShoePolishSchema = new Schema<TShoePolish>(
  {
    saleId: { type: Schema.Types.ObjectId, required: true,ref:"Sale" },
    buyer: { type: Schema.Types.ObjectId, required: true },
    type_of_polish: { 
      type: String, 
      enum: ["standard", "medium", "premium"], 
      required: true,
     },
     seller: { type: Schema.Types.ObjectId, required: true },
    level_of_shine: { type: String, enum: ["low", "medium", "high"], required: true},
    special_instructions: { type: String, required: true },
    status: { type: String, enum: ["received", "in_progress", "complete"], required: true ,default:"received" },
    estimated_completion_time: { type: Date, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true } 
);

export const ShoePolish = mongoose.model<TShoePolish>("ShoePolish", TShoePolishSchema);

