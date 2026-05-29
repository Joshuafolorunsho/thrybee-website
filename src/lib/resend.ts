import { Resend } from "resend";

import { env } from "../../env";

let cached: Resend | undefined;

export function getResend() {
  if (!cached) cached = new Resend(env.RESEND_API_KEY);
  return cached;
}

export const resend = {
  emails: {
    send: (...args: Parameters<Resend["emails"]["send"]>) =>
      getResend().emails.send(...args),
  },
};
