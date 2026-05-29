"use server";

import crypto from "node:crypto";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { env } from "../../../env";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { ConfirmSubscriptionEmail } from "@/emails/confirm-subscription";
import { resend } from "@/lib/resend";

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email(),
  website: z.string().max(0).optional(),
  source: z.string().max(64).optional(),
});

export type SubscribeInput = z.infer<typeof schema>;

type SubscribeStatus =
  | "confirm_sent"
  | "already_subscribed"
  | "invalid"
  | "error";

export type SubscribeResult = {
  status: SubscribeStatus;
  message: string;
};

const CONFIRM_TOKEN_TTL_DAYS = 7;

function newConfirmationToken() {
  return {
    token: crypto.randomBytes(32).toString("base64url"),
    expiresAt: new Date(
      Date.now() + CONFIRM_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    ),
  };
}

function buildUrls(token: string, unsubscribeToken: string) {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return {
    confirmUrl: `${base}/api/early-access/confirm?token=${encodeURIComponent(token)}`,
    unsubscribeUrl: `${base}/api/early-access/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`,
    logoUrl: `${base}/logo.jpg`,
  };
}

async function sendConfirmEmail(args: {
  to: string;
  firstName: string;
  confirmUrl: string;
  unsubscribeUrl: string;
  logoUrl: string;
}) {
  const result = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: args.to,
    subject: "Confirm your Thrybee early access",
    react: ConfirmSubscriptionEmail({
      firstName: args.firstName,
      confirmUrl: args.confirmUrl,
      unsubscribeUrl: args.unsubscribeUrl,
      logoUrl: args.logoUrl,
    }),
  });

  if (result.error) {
    console.error("[subscribe] resend send_confirm failed", result.error);
    throw new Error("resend_failed");
  }
}

export async function subscribe(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { status: "invalid", message: "Please check your name and email." };
  }
  const { firstName, email, website, source } = parsed.data;

  if (website) {
    return { status: "confirm_sent", message: "Check your inbox to confirm." };
  }

  try {
    const existing = await db.query.subscribers.findFirst({
      where: eq(subscribers.email, email),
    });

    if (existing?.status === "confirmed") {
      return {
        status: "already_subscribed",
        message: "You're already on the list.",
      };
    }

    const { token, expiresAt } = newConfirmationToken();

    if (!existing) {
      const inserted = await db
        .insert(subscribers)
        .values({
          email,
          firstName,
          status: "pending",
          confirmationToken: token,
          confirmationTokenExpiresAt: expiresAt,
          source: source ?? "landing_early_access",
        })
        .returning({ unsubscribeToken: subscribers.unsubscribeToken });

      const { confirmUrl, unsubscribeUrl, logoUrl } = buildUrls(
        token,
        inserted[0].unsubscribeToken,
      );
      await sendConfirmEmail({
        to: email,
        firstName,
        confirmUrl,
        unsubscribeUrl,
        logoUrl,
      });
    } else {
      await db
        .update(subscribers)
        .set({
          firstName,
          status: "pending",
          confirmationToken: token,
          confirmationTokenExpiresAt: expiresAt,
          unsubscribedAt: null,
        })
        .where(eq(subscribers.id, existing.id));

      const { confirmUrl, unsubscribeUrl, logoUrl } = buildUrls(
        token,
        existing.unsubscribeToken,
      );
      await sendConfirmEmail({
        to: email,
        firstName,
        confirmUrl,
        unsubscribeUrl,
        logoUrl,
      });
    }

    return {
      status: "confirm_sent",
      message: "Almost there — check your inbox to confirm.",
    };
  } catch (error) {
    console.error("[subscribe] failed", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
