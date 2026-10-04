import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
} from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  type: varchar("type", { length: 60 }).notNull(),
  stayType: varchar("stay_type", { length: 60 }).notNull().default("court"),
  neighborhood: varchar("neighborhood", { length: 120 }).notNull(),
  address: varchar("address", { length: 255 }),
  pricePerNight: integer("price_per_night"),
  pricePerMonth: integer("price_per_month"),
  bedrooms: integer("bedrooms").default(1),
  bathrooms: integer("bathrooms").default(1),
  surfaceM2: integer("surface_m2"),
  maxGuests: integer("max_guests").default(2),
  description: text("description"),
  amenities: jsonb("amenities").$type<string[]>().default([]),
  images: jsonb("images").$type<string[]>().default([]),
  isAvailable: boolean("is_available").default(true),
  isFeatured: boolean("is_featured").default(false),
  rating: integer("rating").default(48),
  reviewsCount: integer("reviews_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id").references(() => properties.id),
  propertyTitle: varchar("property_title", { length: 255 }),
  fullName: varchar("full_name", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull(),
  email: varchar("email", { length: 180 }),
  checkIn: date("check_in"),
  checkOut: date("check_out"),
  guests: integer("guests").default(1),
  stayType: varchar("stay_type", { length: 60 }).default("court"),
  message: text("message"),
  totalEstimated: integer("total_estimated"),
  status: varchar("status", { length: 40 }).default("nouveau"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  email: varchar("email", { length: 180 }),
  phone: varchar("phone", { length: 60 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ownerLeads = pgTable("owner_leads", {
  id: uuid("id").defaultRandom().primaryKey(),

  fullName: varchar("full_name", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull(),
  email: varchar("email", { length: 180 }),

  propertyType: varchar("property_type", { length: 80 }),
  neighborhood: varchar("neighborhood", { length: 120 }),
  address: varchar("address", { length: 255 }),

  stayType: varchar("stay_type", { length: 30 }),
  pricePerNight: integer("price_per_night"),
  pricePerMonth: integer("price_per_month"),

  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  surfaceM2: integer("surface_m2"),
  furnished: varchar("furnished", { length: 30 }),
  availableFrom: date("available_from"),

  message: text("message"),

  images: jsonb("images").$type<string[]>().default([]),

  status: varchar("status", { length: 30 }).default("pending"),
  reviewNotes: text("review_notes"),
  reviewedAt: timestamp("reviewed_at"),

  createdAt: timestamp("created_at").defaultNow(),
});

export type Property = typeof properties.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type OwnerLead = typeof ownerLeads.$inferSelect;
