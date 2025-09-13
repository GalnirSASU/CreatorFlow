import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Lead = { email: string; createdAt?: string; ua?: string };

function toCsv(leads: Lead[]): string {
  const header = ["email", "createdAt", "ua"];
  const rows = leads.map((l) => [l.email || "", l.createdAt || "", l.ua || ""]);
  const esc = (v: string) => {
    if (v == null) return "";
    const s = String(v);
    if (s.includes("\"") || s.includes(",") || s.includes("\n")) {
      return '"' + s.replace(/\"/g, '""') + '"';
    }
    return s;
  };
  return [header.join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || req.headers.get("x-export-token") || undefined;
    const required = process.env.EXPORT_TOKEN;
    if (required && token !== required) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const file = path.join(process.cwd(), "data", "leads.json");
    let leads: Lead[] = [];
    try {
      const raw = await fs.readFile(file, "utf-8");
      const parsed = JSON.parse(raw);
      leads = Array.isArray(parsed) ? (parsed as Lead[]) : [];
    } catch {
      leads = [];
    }

    const csv = toCsv(leads);
    const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch {
    return new NextResponse("Server error", { status: 500 });
  }
}
