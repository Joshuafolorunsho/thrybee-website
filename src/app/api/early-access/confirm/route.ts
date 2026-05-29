import { and, eq, gt } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "../../../../../env";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { WelcomeEmail } from "@/emails/welcome";
import { resend } from "@/lib/resend";

function redirect(path: string, message?: string) {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const url = new URL(path, base);
  if (message) url.searchParams.set("reason", message);
  return NextResponse.redirect(url, { status: 302 });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return redirect("/early-access/confirmed", "invalid");

  try {
    const now = new Date();
    const subscriber = await db.query.subscribers.findFirst({
      where: and(
        eq(subscribers.confirmationToken, token),
        gt(subscribers.confirmationTokenExpiresAt, now),
      ),
    });

    if (!subscriber) return redirect("/early-access/confirmed", "expired");

    if (subscriber.status === "confirmed") {
      return redirect("/early-access/confirmed");
    }

    await db
      .update(subscribers)
      .set({
        status: "confirmed",
        confirmedAt: now,
        confirmationToken: null,
        confirmationTokenExpiresAt: null,
      })
      .where(eq(subscribers.id, subscriber.id));

    const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const unsubscribeUrl = `${base}/api/early-access/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
    const logoUrl = `${base}/logo.jpg`;

    const result = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: subscriber.email,
      subject: "Welcome to Thrybee early access",
      react: WelcomeEmail({
        firstName: subscriber.firstName,
        unsubscribeUrl,
        logoUrl,
      }),
    });

    if (result.error) {
      console.error("[confirm] resend send_welcome failed", result.error);
    }

    return redirect("/early-access/confirmed");
  } catch (error) {
    console.error("[confirm] failed", error);
    return redirect("/early-access/confirmed", "error");
  }
}
