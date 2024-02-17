import { z } from "zod";

const CreateShoePolishValidationSchema = z.object({
  body:z.object({
    user_id: z.string(), 
    type_of_polish: z.enum(["standard", "medium", "'premium'"]),
    seller_id: z.string(), 
    level_of_shine: z.enum(["low", "medium", "high"]),
    special_instructions: z.string(),
    status: z.enum(["pending", "in_progress", "complete"]).default("pending"),
    estimated_completion_time: z.string(),
    cost: z.number(),
  })
});

const UpdateShoePolishValidationSchema = z.object({
  body:z.object({ 
    type_of_polish: z.enum(["standard", "medium", "premium"]).optional(),
    level_of_shine: z.enum(["low", "medium", "high"]).optional(),
    special_instructions: z.string().optional(),
    status: z.enum(["pending", "in_progress", "complete"]).optional(),
    estimated_completion_time: z.string().optional(),
    cost: z.number().optional(),
  })
});

export const ShoePolishValidation = {
    CreateShoePolishValidationSchema,
    UpdateShoePolishValidationSchema
}