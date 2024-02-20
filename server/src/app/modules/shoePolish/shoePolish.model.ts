import mongoose, { Schema } from "mongoose";

import { TShoePolish } from "./shoePolish.interface";

const TShoePolishSchema = new Schema<TShoePolish>(
  {
    saleId: { type: Schema.Types.ObjectId, required: true,ref:"Sale" },
    type_of_polish: { 
      type: String, 
      enum: ["standard", "medium", "premium"], 
      required: true,
     },
    level_of_shine: { type: String, enum: ["low", "medium", "high"], required: true},
    special_instructions: { type: String },
    status: { type: String, enum: ["received", "in_progress", "complete"], required: true ,default:"received" },
    estimated_completion_time: { type: Date, required: true },
    cost: { type: Number },
  },
  { timestamps: true } 
);

export const ShoePolish = mongoose.model<TShoePolish>("ShoePolish", TShoePolishSchema);


