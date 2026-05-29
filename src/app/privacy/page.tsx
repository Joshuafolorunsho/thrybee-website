import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Thrybee",
};

export default async function PrivacyRoute() {
  const html = await fs.readFile(
    path.join(process.cwd(), "src/content/privacy.html"),
    "utf8",
  );
  return <LegalPage title="Privacy Policy" updated="May 28, 2026" html={html} />;
}
