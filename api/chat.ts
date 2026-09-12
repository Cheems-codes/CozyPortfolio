const GEMINI_MODEL = "gemini-3.6-flash";
const MAX_MESSAGE_LENGTH = 2000;

type VercelRequest = {
  method?: string;
  body?: { message?: unknown };
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  end: () => VercelResponse;
};

const portfolioInstructions = `You are the friendly AI assistant for Tyrone Olbes's kawaii bento-box portfolio website.

Only answer questions about the portfolio, Tyrone, and the projects or information listed below. If a question is unrelated, politely explain that you can only answer questions about this portfolio.

Portfolio information:
- Tyrone Olbes is a third-year BS Information Technology student.
- The website has About Me, Projects, Services, Certificates, and Contact sections.
- Pet Arena is a mini auto-battler inspired by games like Super Auto Pets. Players recruit up to five pets, build a team, and automatically battle a randomly generated enemy squad.
- QuizAct, also called Signal Sprint, is a single-page timed quiz app with multiple-choice and fill-in-the-blank questions, a 20-second timer per question, keyboard navigation, auto-saved answers, and scored results review. It was an activity assigned by a professor to be completed within one hour.
- The portfolio is built with React, TypeScript, Vite, Tailwind CSS, and Wouter.
- The portfolio includes certificates categorized by topics such as Network, Finance, and Extracurricular.
- Visitors can use the Contact section to find Tyrone's available social links and contact information.

Be concise, warm, and helpful. Do not invent personal details, certificates, contact information, project features, or links that are not provided above.`;

function sendJson(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json").json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured");
    return sendJson(res, 500, { error: "Chatbot is not configured yet." });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return sendJson(res, 400, { error: "Please enter a message." });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return sendJson(res, 400, {
      error: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: portfolioInstructions }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      return sendJson(res, 502, { error: "The chatbot could not respond right now." });
    }

    const data = (await geminiResponse.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      return sendJson(res, 502, { error: "The chatbot returned an empty response." });
    }

    return sendJson(res, 200, { answer });
  } catch (error) {
    console.error("Chatbot request failed:", error);
    return sendJson(res, 500, { error: "The chatbot could not respond right now." });
  }
}
