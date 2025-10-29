import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  propertyAddress: text("property_address").notNull(),
  propertyValue: decimal("property_value").notNull(),
  loanAmount: decimal("loan_amount").notNull(),
  propertyType: text("property_type").notNull(),
  ltv: decimal("ltv").notNull(),
  interestRate: decimal("interest_rate").notNull(),
  monthlyPayment: decimal("monthly_payment").notNull(),
  prototypeVersion: text("prototype_version").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type PropertyType =
  | "bedrijfspand"
  | "bedrijfspand_met_bedrijfswoning"
  | "kantoor"
  | "woning_voor_verhuur"
  | "transformatie"
  | "winkel"
  | "woon_winkelpand"
  | "horeca"
  | "recreatiewoning_voor_verhuur"
  | "supermarkt"
  | "zorgvastgoed"
  | "agrarisch"
  | "verbouwing_woning"
  | "verbouwing_bedrijfspand"
  | "verduurzaming";

export interface CalculatorFormData {
  propertyAddress: string;
  propertyValue: string;
  loanAmount: string;
  propertyType: PropertyType;
  isDutchProperty: "ja" | "nee";
  propertyUsage: "eigen_gebruik" | "verhuur" | "combinatie" | "verkoop";
  duration: string;
  repaymentType: string;
}

export interface CalculationResult {
  ltv: number;
  interestRate: number;
  monthlyPayment: number;
  duration?: number;
  amortization?: number;
  repaymentType?: string;
}
