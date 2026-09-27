// QVAC Public Speaking Opener Writer — core logic.
// Given a talk topic and audience, writes one strong opening hook line
// grounded in that specific topic (not a generic "Hello everyone" line).

import { completion } from "@qvac/sdk";

function looksUnusable(text) {
  if (!text || text.trim().length < 3) return true;
  if (text.length > 500) return true;
  const bad = [
    "i cannot", "i can't", "as an ai", "i'm not able", "i do not have",
    "i'm sorry", "i am sorry", "please provide more", "please try again",
    "i'd be happy to help", "could you provide", "can you provide",
  ];
  const lower = text.toLowerCase();
  return bad.some((phrase) => lower.includes(phrase));
}

function stripWrapping(text) {
  return text
    .trim()
    .replace(/^here'?s[^:\n]*:\s*/i, "")
    .replace(/^(opener|opening line|hook|hook line):\s*/i, "")
    .trim()
    .replace(/^["“]|["”]$/g, "")
    .trim();
}

const FALLBACK = (topic, audience) =>
  `Imagine explaining "${topic}" to ${audience} in one sentence — that's exactly what we're about to do, starting now.`;

export async function generate(modelId, topic, audience) {
  const run = completion({
    modelId,
    history: [
      {
        role: "system",
        content:
          "You write strong opening hook lines for speeches. Given the talk's topic and its audience, write ONE compelling opening line that a speaker could say as their very first sentence — specific to the topic, not generic. " +
          "Reply with ONLY the opening line, no preamble, no quotation marks, no label.",
      },
      { role: "user", content: "Topic: the hidden cost of context switching at work\nAudience: software engineering managers" },
      {
        role: "assistant",
        content: "Every time your engineer gets pinged mid-flow, you're not losing five minutes — you're losing the next twenty-three.",
      },
      { role: "user", content: `Topic: ${topic}\nAudience: ${audience}` },
    ],
    stream: true,
    completionOpts: { temperature: 0.8, maxTokens: 150 },
  });

  let text = "";
  for await (const token of run.tokenStream) text += token;
  text = stripWrapping(text);

  const opener = looksUnusable(text) ? FALLBACK(topic, audience) : text;
  return { opener };
}
