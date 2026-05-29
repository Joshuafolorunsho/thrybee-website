"use server";

import { z } from "zod";

import { env } from "../../../env";
import { ConfirmSubscriptionEmail } from "@/emails/confirm-subscription";
import { callWaitlist } from "@/lib/convex";
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

type ConvexSubscribeResult =
  | { status: "already_confirmed" }
  | {
      status: "new" | "resent";
      firstName: string;
      confirmationToken: string;
      unsubscribeToken: string;
    };

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
    const result = await callWaitlist<ConvexSubscribeResult>("subscribe", {
      email,
      firstName,
      source: source ?? "landing_early_access",
    });

    if (result.status === "already_confirmed") {
      return {
        status: "already_subscribed",
        message: "You're already on the list.",
      };
    }

    const { confirmUrl, unsubscribeUrl, logoUrl } = buildUrls(
      result.confirmationToken,
      result.unsubscribeToken,
    );
    await sendConfirmEmail({
      to: email,
      firstName: result.firstName,
      confirmUrl,
      unsubscribeUrl,
      logoUrl,
    });

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
