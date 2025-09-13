import { NextResponse } from "next/server";
import type { ListAudiencesResponse, CreateAudienceResponse } from "resend";
import { promises as fs } from "fs";
import path from "path";

type Lead = {
  email: string;
  createdAt?: string;
  ua?: string;
};

async function appendLead(email: string, meta: Partial<Lead>) {
  const dataDir = path.join(process.cwd(), "data");
  const file = path.join(dataDir, "leads.json");
  try {
    await fs.mkdir(dataDir, { recursive: true });
    let leads: Lead[] = [];
    try {
      const raw = await fs.readFile(file, "utf-8");
      const parsed = JSON.parse(raw) as unknown;
      leads = Array.isArray(parsed) ? (parsed as Lead[]) : [];
    } catch {
      // ignore if file does not exist or invalid
      leads = [];
    }
    if (!leads.find((l) => l.email?.toLowerCase() === email.toLowerCase())) {
      leads.push({ email, ...meta });
      await fs.writeFile(file, JSON.stringify(leads, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to persist lead:", error);
  }
}

async function forwardViaResend(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBSCRIBE_FORWARD_TO;
  const from = process.env.SUBSCRIBE_FROM || "CréaScope <onboarding@creascope.app>";
  if (!apiKey || !to) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: "Nouveau lead (bêta CréaScope)",
      text: `Email: ${email}`,
    });
  } catch (error) {
    console.error("Failed to forward via Resend:", error);
  }
}

async function addToResendAudience(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    let audienceId = process.env.RESEND_AUDIENCE_ID;
    const audienceName = process.env.RESEND_AUDIENCE_NAME || "CréaScope — Bêta";

    if (!audienceId) {
      const list = (await resend.audiences.list()) as ListAudiencesResponse;
      const found = list.data?.data?.find((a) => a.name === audienceName);
      if (found?.id) {
        audienceId = found.id;
      } else {
        const created = (await resend.audiences.create({ name: audienceName })) as CreateAudienceResponse;
        audienceId = created.data?.id;
      }
    }

    if (audienceId) {
      await resend.contacts.create({ audienceId, email });
    }
  } catch (error) {
    console.error("Failed to add contact to Resend audience:", error);
  }
}

export async function POST(req: Request) {
  try {
    const { email, hp } = await req.json();
    if (hp) {
      // Honeypot triggered: pretend success
      return NextResponse.json({ ok: true });
    }
    if (!email || typeof email !== "string" || !/.+@.+\..+/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || undefined;
    const when = new Date().toISOString();

    await appendLead(email, { createdAt: when, ua });
    await forwardViaResend(email);
    const enableAudience = process.env.SUBSCRIBE_ADD_TO_RESEND_AUDIENCE === "1";
    if (enableAudience && (process.env.RESEND_AUDIENCE_ID || process.env.RESEND_AUDIENCE_NAME)) {
      await addToResendAudience(email);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
