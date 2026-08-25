declare const process: any;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { emirate, interest, duration } = req.body;
  const apiKey = process.env?.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "GEMINI_API_KEY missing on Vercel. Please add it under Settings -> Environment Variables.",
    });
  }

  const daysCount = parseInt(duration) || 1;

  const prompt = `You are a professional UAE travel guide AI. Generate a realistic travel itinerary based on:
- Emirate: ${emirate}
- Interest: ${interest}
- Duration: ${daysCount} Days

Generate 1 Morning stop and 1 Afternoon stop for every day up to Day ${daysCount}.

Return ONLY valid JSON matching this exact structure:
{
  "title": "${daysCount}-Day ${interest} in ${emirate}",
  "summary": "Brief 1-2 sentence overview of the trip.",
  "stops": [
    {
      "day": 1,
      "timing": "Morning",
      "name": "Specific Real Attraction Name (e.g., Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, Al Fahidi, Jebel Jais)",
      "emirate": "${emirate}",
      "note": "1 sentence describing what to do here."
    }
  ]
}`;

  const modelCandidates = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

  let lastError = "";

  try {
    for (const model of modelCandidates) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Gemini API Error (model: ${model}):`, errText);
        lastError = errText;
        if (response.status === 404) {
          continue;
        }
        return res
          .status(500)
          .json({ error: `Gemini API Error (model: ${model}): ${errText}` });
      }

      const data = await response.json();
      let rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawJsonText) {
        lastError = "No text response from Gemini AI.";
        continue;
      }

      // Strip markdown formatting (```json ... ```)
      rawJsonText = rawJsonText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        const itinerary = JSON.parse(rawJsonText);
        return res.status(200).json({ itinerary });
      } catch (parseErr: any) {
        console.error(
          `Failed to parse Gemini JSON (model: ${model}):`,
          rawJsonText
        );
        lastError = `Could not parse itinerary JSON from model ${model}: ${parseErr.message}`;
        continue;
      }
    }

    // Every candidate model failed.
    return res.status(500).json({
      error: `All Gemini models failed. Last error: ${lastError}. Double-check that GEMINI_API_KEY in Vercel is a valid, unrestricted key from https://aistudio.google.com/apikey.`,
    });
  } catch (error: any) {
    console.error("Error in itinerary handler:", error);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
}
