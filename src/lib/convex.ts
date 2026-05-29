import { env } from "../../env";

type Endpoint = "subscribe" | "confirm" | "unsubscribe";

export async function callWaitlist<T>(
  endpoint: Endpoint,
  body: Record<string, unknown>,
): Promise<T> {
  const base = env.CONVEX_HTTP_URL.replace(/\/$/, "");
  const response = await fetch(`${base}/waitlist/${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${env.CONVEX_WEBHOOK_SECRET}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `convex_waitlist_${endpoint}_failed:${response.status}:${text}`,
    );
  }
  return (await response.json()) as T;
}
