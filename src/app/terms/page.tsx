import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — Thrybee",
};

export default async function TermsRoute() {
  const html = await fs.readFile(
    path.join(process.cwd(), "src/content/terms.html"),
    "utf8",
  );
  return (
    <LegalPage title="Terms & Conditions" updated="May 28, 2026" html={html} />
  );
}
