import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "../../../../../env";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

function redirect(path: string, message?: string) {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const url = new URL(path, base);
  if (message) url.searchParams.set("reason", message);
  return NextResponse.redirect(url, { status: 302 });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return redirect("/early-access/unsubscribed", "invalid");

  try {
    const subscriber = await db.query.subscribers.findFirst({
      where: eq(subscribers.unsubscribeToken, token),
    });

    if (!subscriber) return redirect("/early-access/unsubscribed", "unknown");

    if (subscriber.status !== "unsubscribed") {
      await db
        .update(subscribers)
        .set({
          status: "unsubscribed",
          unsubscribedAt: new Date(),
          confirmationToken: null,
          confirmationTokenExpiresAt: null,
        })
        .where(eq(subscribers.id, subscriber.id));
    }

    return redirect("/early-access/unsubscribed");
  } catch (error) {
    console.error("[unsubscribe] failed", error);
    return redirect("/early-access/unsubscribed", "error");
  }
}
