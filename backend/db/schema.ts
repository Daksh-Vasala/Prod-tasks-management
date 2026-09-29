import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const TaskStatus = pgEnum("task_status", [
  "pending",
  "in_progress",
  "completed",
]);

export const UserRole = pgEnum("user_role", ["admin", "subscriber"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userName: text("user_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  userRole: UserRole("user_role").notNull().default("subscriber"),
  phoneNumber: text("phone_number").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
});

export const options = pgTable("options", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  optionName: text("option_name").notNull().unique(),
  optionValue: text("option_value"),
});

export const tasks = pgTable("tasks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description"),
  status: TaskStatus("status").notNull().default("pending"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
});