import { NextResponse, type NextRequest } from "next/server";

import { env } from "../../../../../env";
import { WelcomeEmail } from "@/emails/welcome";
import { callWaitlist } from "@/lib/convex";
import { resend } from "@/lib/resend";

type ConfirmResult =
  | { status: "invalid" }
  | { status: "expired" }
  | {
      status: "confirmed";
      email: string;
      firstName: string;
      unsubscribeToken: string;
    }
  | {
      status: "already_confirmed";
      email: string;
      firstName: string;
      unsubscribeToken: string;
    };

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
    const result = await callWaitlist<ConfirmResult>("confirm", { token });

    if (result.status === "invalid") {
      return redirect("/early-access/confirmed", "invalid");
    }
    if (result.status === "expired") {
      return redirect("/early-access/confirmed", "expired");
    }
    if (result.status === "already_confirmed") {
      return redirect("/early-access/confirmed");
    }

    const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const unsubscribeUrl = `${base}/api/early-access/unsubscribe?token=${encodeURIComponent(result.unsubscribeToken)}`;
    const logoUrl = `${base}/logo.jpg`;

    const sendResult = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: result.email,
      subject: "Welcome to Thrybee early access",
      react: WelcomeEmail({
        firstName: result.firstName,
        unsubscribeUrl,
        logoUrl,
      }),
    });

    if (sendResult.error) {
      console.error("[confirm] resend send_welcome failed", sendResult.error);
    }

    return redirect("/early-access/confirmed");
  } catch (error) {
    console.error("[confirm] failed", error);
    return redirect("/early-access/confirmed", "error");
  }
}
