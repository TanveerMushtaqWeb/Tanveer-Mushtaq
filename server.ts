import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({ apiKey: key });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI client:", err);
      }
    }
  }
  return aiClient;
}

const fallbackExpertResponses: Record<string, string> = {
  clutch: "For stiff or frequently snapping clutch cables (especially in Honda CG 125 or Rickshaws), Tanveer Factory Cable uses pre-stretched 19-strand 2.5mm high-tensile galvanized steel with a Teflon inner sleeve. We recommend ensuring the lever pivot is greased and routing the cable without sharp 90-degree bends near the triple tree.",
  brake: "Motorcycle front brake cables are safety-critical. Tanveer Factory Brake Cables are tested to 2,800N tensile load (nearly 3x standard rider hand force) and feature die-cast zinc nipples that prevent terminal pull-off under emergency braking.",
  accelerator: "For throttle and accelerator cables, zero-friction response is essential. Our cables feature dual-extruded PVC housing with inner nylon lubricant, ensuring instantaneous throttle return and smooth acceleration without sticking.",
  speedometer: "Tanveer Factory speedometer and RPM cables use multi-layer spiral wound square-drive flexible cores that withstand up to 12,000 RPM continuous rotation without whipping or gauge needle vibration.",
  wholesale: "Tanveer Factory Cable welcomes distributors and spare parts retailers across Pakistan. We offer bulk cartons (50 to 500 pcs) with competitive wholesale margins (up to 35%), nationwide cargo delivery via Daewoo/TCS/Bilal Cargo, and authorized dealer branding materials.",
  default: "Tanveer Factory Cable is Pakistan's dedicated manufacturer of heavy-duty motorcycle and industrial control cables. Our products cover Honda CD70/CG125, Yamaha YBR, Suzuki GS150, Chinese 70cc/100cc/125cc, and 3-wheeler auto rickshaws with 6-month durability assurance."
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      company: "Tanveer Factory Cable",
      timestamp: new Date().toISOString()
    });
  });

  // AI Cable Technical Consultant endpoint
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { message, bikeModel, cableType, language } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getAIClient();

      if (client) {
        try {
          const systemInstruction = `You are the Chief Technical Engineer & Expert Consultant at "Tanveer Factory Cable", Pakistan's premier motorcycle and industrial cable manufacturing factory founded by Tanveer Mushtaq.
Your role is to advise Pakistani motorcycle users, mechanics (ustad ji / mistri), spare parts shopkeepers (Montgomery Road Lahore, Aurangzeb Market Karachi, Rawalpindi, etc.), and fleet operators.
You provide authoritative, helpful, and courteous advice about motorcycle cables (Clutch, Brake, Throttle/Accelerator, Speedometer, RPM, Choke, Gear cables for Honda CD70, CG125, Pridor, Yamaha YBR, Suzuki GS150/GD110, United/Road Prince 70cc, Qingqi rickshaws).
You know cable engineering: 19-strand stainless/galvanized steel, Teflon lining, zinc die-cast nipples, outer conduit coil, anti-friction grease, and common Pakistani road conditions (dust, heat, monsoon moisture).
Reply in a friendly, professional tone. If the user asks in Roman Urdu or Urdu, you may reply in polite, easy-to-read Roman Urdu or Urdu with technical clarity. If in English, reply in English. Keep answers practical, actionable (2-4 concise paragraphs) and highlight Tanveer Factory Cable's engineering strengths.`;

          const prompt = `User Query: "${message}"
Context:
- Bike Model: ${bikeModel || "Not specified"}
- Cable Type: ${cableType || "Not specified"}
- Preferred Language: ${language || "English / Roman Urdu"}

Provide technical advice, maintenance tips, or factory recommendation.`;

          const response = await client.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 600,
            }
          });

          const replyText = response.text || "";
          return res.json({ reply: replyText, source: "gemini" });
        } catch (apiError) {
          console.warn("Gemini API call failed, falling back to expert knowledge engine:", apiError);
        }
      }

      // Intelligent deterministic fallback based on keywords
      const lower = (message + " " + (bikeModel || "") + " " + (cableType || "")).toLowerCase();
      let selectedReply = fallbackExpertResponses.default;
      if (lower.includes("clutch") || lower.includes("toot") || lower.includes("tight") || lower.includes("sakht")) {
        selectedReply = fallbackExpertResponses.clutch;
      } else if (lower.includes("brake") || lower.includes("break") || lower.includes("ruk")) {
        selectedReply = fallbackExpertResponses.brake;
      } else if (lower.includes("accelerator") || lower.includes("race") || lower.includes("throttle") || lower.includes("speed")) {
        selectedReply = fallbackExpertResponses.accelerator;
      } else if (lower.includes("meter") || lower.includes("speedo") || lower.includes("rpm")) {
        selectedReply = fallbackExpertResponses.speedometer;
      } else if (lower.includes("wholesale") || lower.includes("dealer") || lower.includes("price") || lower.includes("rate") || lower.includes("dukan")) {
        selectedReply = fallbackExpertResponses.wholesale;
      }

      return res.json({
        reply: selectedReply,
        source: "expert_system",
        note: "Direct technical advisor response from Tanveer Factory Cable Engineering Desk."
      });

    } catch (err: any) {
      console.error("Error in /api/ai-advisor:", err);
      return res.status(500).json({ error: "Failed to process inquiry" });
    }
  });

  // Bulk inquiry / Dealer application logging endpoint
  app.post("/api/inquiries", (req, res) => {
    try {
      const inquiry = req.body;
      console.log("[Tanveer Factory Cable] New Business Inquiry received:", inquiry);
      // Return confirmation reference number
      const refId = "TFC-" + Math.floor(100000 + Math.random() * 900000);
      return res.json({
        success: true,
        referenceId: refId,
        message: "Your inquiry has been registered with Tanveer Factory Cable Sales Desk. Our representative will contact you via WhatsApp/phone within 24 business hours."
      });
    } catch (error) {
      return res.status(500).json({ error: "Could not save inquiry" });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Tanveer Factory Cable] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
