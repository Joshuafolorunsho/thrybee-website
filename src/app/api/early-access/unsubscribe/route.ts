import { NextResponse, type NextRequest } from "next/server";

import { env } from "../../../../../env";
import { callWaitlist } from "@/lib/convex";

type UnsubscribeResult = {
  status: "unsubscribed" | "already_unsubscribed" | "unknown";
};

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
    const result = await callWaitlist<UnsubscribeResult>("unsubscribe", {
      token,
    });
    if (result.status === "unknown") {
      return redirect("/early-access/unsubscribed", "unknown");
    }
    return redirect("/early-access/unsubscribed");
  } catch (error) {
    console.error("[unsubscribe] failed", error);
    return redirect("/early-access/unsubscribed", "error");
  }
}
