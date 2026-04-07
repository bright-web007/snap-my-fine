import { z } from "zod";

// Email sending request schema
export const SendEmailSchema = z.object({
  to: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Email body is required"),
  fineDetails: z.object({
    council: z.string().min(1, "Council is required"),
    pcnNumber: z.string().min(1, "PCN Number is required"),
    vehicleNumber: z.string().min(1, "Vehicle Number is required"),
    fineAmount: z.string().min(1, "Fine Amount is required"),
  }),
});

// Email response schema
export const SendEmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

// API request params schema
export const SendEmailParamsSchema = z.object({
  to: z.string().email("Invalid email address"),
});

// Raw n8n response schema 
export const N8nResponseSchema = z.object({
  output: z.object({
    pcn_number: z.union([z.string(), z.null(), z.undefined()]),
    plate_number: z.union([z.string(), z.null(), z.undefined()]),
    amount: z.union([z.number(), z.null(), z.undefined()]),
    service_date_notice: z.union([z.string(), z.null(), z.undefined()]),
    council_name: z.union([z.string(), z.null(), z.undefined()]),
    issued_by: z.union([z.string(), z.null(), z.undefined()]),
    convtravention_time_from: z.union([z.string(), z.null(), z.undefined()]),
    convtravention_time_to: z.union([z.string(), z.null(), z.undefined()]),
  }),
});
export type N8nResponse = z.infer<typeof N8nResponseSchema>;

export const TicketResponseSchema = z.object({
  _id: z.string().uuid().optional(),
  plate_number: z.union([z.string(), z.null()]),
  email: z.union([z.string(), z.null()]),
  council: z.union([z.string(), z.null()]),
  pcn_number: z.union([z.string(), z.null()]),
  amount: z.union([z.number(), z.null(), z.undefined()]),
  issued_date: z.union([z.string(), z.null(), z.undefined()]),

  issue_details: z.object({
    issue_date: z.union([z.string(), z.null()]),
    initial_amount: z.union([z.number(), z.null()]),
    discount_amount: z.union([z.string(), z.null()]),
    status: z.union([z.string(), z.null()]),
  }).optional()
});
export type TicketResponse = z.infer<typeof TicketResponseSchema>;

export interface TicketDetailsInterface {
  council: string;
  email: string | null;
  pcn_number?: string | null;
  plate_number?: string | null;
  amount?: number | null;
  service_date_notice?: string | null;
  council_name?: string | null;
  issued_by?: string | null;
  convtravention_time_from?: string | null;
  convtravention_time_to?: string | null;
}

// Kafka Fine Reminder Event Schema
export const FineReminderEventSchema = z.object({
  user_email: z.string().email("Invalid email address"),
  council: z.string().min(1, "Council is required"),
  council_name: z.string().optional(),
  pcn_number: z.string().min(1, "PCN Number is required"),
  plate_number: z.string().min(1, "Plate number is required"),
  amount: z.number().positive("Amount must be positive"),
  discount_amount: z.number().optional(),
  discount_expires_at: z.string().optional(),
  enforcement_date: z.string().optional(),
  service_date_notice: z.string().optional(),
  issued_by: z.string().optional(),
  convtravention_time_from: z.string().optional(),
  convtravention_time_to: z.string().optional(),
  event_type: z.enum([
    'fine.discount.week_left',
    'fine.discount.3days',
    'fine.discount.tomorrow',
    'fine.discount.final_hours',
    'fine.full.discount_expired',
    'fine.full.5days_left',
    'fine.full.final_day',
    'fine.enforcement.started',
    'fine.enforcement.overdue'
  ]),
  timestamp: z.string().optional(),
  project_uuid: z.string().optional().default("HIVEDECK")
});

export type FineReminderEvent = z.infer<typeof FineReminderEventSchema>;

// Kafka Consumer Status Schema
export const ConsumerStatusSchema = z.object({
  isConnected: z.boolean(),
  isConsuming: z.boolean(),
  messagesProcessed: z.number(),
  lastMessageAt: z.string().optional(),
  errors: z.array(z.string()).optional(),
  consumerLag: z.number().optional()
});

export type ConsumerStatus = z.infer<typeof ConsumerStatusSchema>;

