
import OpenAI from "openai";

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  defaultHeaders: {
    'HTTP-Referer': 'https://shivfarm-7778.myshopify.com/',
    'X-Title': 'shivfarm-7778', // Optional. Site title for rankings on openrouter.ai.
  },
});
// ✅ Loader: GET route
export async function loader() {
  return Response.json({
    success: true,
    message: "AI Chat endpoint is active ✅",
  });
}

// ✅ Action: POST route
export async function action({ request }) {
  try {
    const { message } = await request.json();

    if (!message || message.trim() === "") {
      return Response.json({ reply: "Please enter a message." });
    }

    // ✅ Correct API call with model
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free", // REQUIRED
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (err) {
    // ✅ Enhanced debugging
    console.error("🔥 OpenAI API Error:", err);
    return Response.json({ reply: `Oops! Something went wrong. (${err.message})` });
  }
}
