declare const process: any;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emirate, interest, duration } = req.body;
  const apiKey = process.env?.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY missing. Add it to your .env.local file or Vercel Environment Variables.'
    });
  }

  const daysCount = parseInt(duration) || 1;

  const prompt = `You are a professional UAE travel guide AI. Generate a realistic and engaging travel itinerary based on:
- Emirate: ${emirate}
- Interest: ${interest}
- Duration: ${daysCount} Days

Ensure that for EVERY day from Day 1 to Day ${daysCount}, you generate 1 Morning stop and 1 Afternoon stop with distinct, real locations.

Return ONLY a valid JSON object matching this structure:
{
  "title": "${daysCount}-Day ${interest} in ${emirate}",
  "summary": "Brief 1-2 sentence overview of the trip.",
  "stops": [
    {
      "day": 1,
      "timing": "Morning",
      "name": "Specific Real Attraction Name",
      "emirate": "Emirate Name",
      "note": "1 helpful sentence describing what to do here."
    },
    {
      "day": 1,
      "timing": "Afternoon",
      "name": "Specific Real Attraction Name",
      "emirate": "Emirate Name",
      "note": "1 helpful sentence describing what to do here."
    }
  ]
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(500).json({ error: 'AI generation failed from Gemini API.' });
    }

    const data = await response.json();
    const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawJsonText) {
      return res.status(500).json({ error: 'No response content from AI.' });
    }

    const itinerary = JSON.parse(rawJsonText);
    return res.status(200).json({ itinerary });
  } catch (error) {
    console.error('Error in itinerary handler:', error);
    return res.status(500).json({ error: 'Internal server error while querying AI.' });
  }
}