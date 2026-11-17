import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  date,
} from "drizzle-orm/pg-core";

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  serviceArea: varchar("service_area", { length: 120 }).notNull(),
  location: varchar("location", { length: 160 }),
  timeline: varchar("timeline", { length: 80 }),
  budget: varchar("budget", { length: 80 }),
  details: text("details").notNull(),
  status: varchar("status", { length: 40 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  subject: varchar("subject", { length: 200 }).notNull(),
  category: varchar("category", { length: 60 }).notNull().default("enquiry"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  certificateNo: varchar("certificate_no", { length: 80 }).notNull().unique(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  instrument: varchar("instrument", { length: 200 }).notNull(),
  serialNo: varchar("serial_no", { length: 120 }).notNull(),
  laboratory: varchar("laboratory", { length: 120 }).notNull(),
  calibrationDate: date("calibration_date").notNull(),
  dueDate: date("due_date").notNull(),
  technician: varchar("technician", { length: 160 }).notNull(),
  isValid: boolean("is_valid").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const jobOpenings = pgTable("job_openings", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  department: varchar("department", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  type: varchar("type", { length: 60 }).notNull(),
  summary: text("summary").notNull(),
  requirements: text("requirements").notNull(),
  isOpen: boolean("is_open").notNull().default(true),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobOpenings.id),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  position: varchar("position", { length: 200 }).notNull(),
  yearsExperience: integer("years_experience"),
  linkedin: varchar("linkedin", { length: 300 }),
  coverLetter: text("cover_letter").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 240 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: varchar("cover_image", { length: 600 }),
  coverAlt: varchar("cover_alt", { length: 240 }),
  category: varchar("category", { length: 80 }).notNull().default("Insights"),
  tags: text("tags").notNull().default(""),
  author: varchar("author", { length: 160 }).notNull().default("EATL Editorial"),
  authorType: varchar("author_type", { length: 30 }).notNull().default("human"),
  source: varchar("source", { length: 60 }).notNull().default("editorial"),
  sourceAgent: varchar("source_agent", { length: 160 }),
  externalId: varchar("external_id", { length: 200 }),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  featured: boolean("featured").notNull().default(false),
  readMinutes: integer("read_minutes").notNull().default(4),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
