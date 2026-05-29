import { sql } from "drizzle-orm";
import {
  customType,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

export const subscriberStatus = pgEnum("subscriber_status", [
  "pending",
  "confirmed",
  "unsubscribed",
]);

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: citext("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  status: subscriberStatus("status").notNull().default("pending"),
  confirmationToken: text("confirmation_token"),
  confirmationTokenExpiresAt: timestamp("confirmation_token_expires_at", {
    withTimezone: true,
  }),
  unsubscribeToken: uuid("unsubscribe_token")
    .notNull()
    .unique()
    .default(sql`gen_random_uuid()`),
  source: text("source"),
  subscribedAt: timestamp("subscribed_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
