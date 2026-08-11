declare const process: any;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emirate, interest, duration } = req.body;
  const apiKey = process.env?.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is missing on Vercel. Add GEMINI_API_KEY under Project Settings -> Environment Variables.'
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
      "name": "Specific Real Attraction Name",
      "emirate": "${emirate}",
      "note": "1 sentence describing what to do here."
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
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(500).json({ error: 'Gemini API returned an error: ' + errText });
    }

    const data = await response.json();
    let rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawJsonText) {
      return res.status(500).json({ error: 'No text response from Gemini AI.' });
    }

    // Clean markdown code blocks if present (```json ... ```)
    rawJsonText = rawJsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    const itinerary = JSON.parse(rawJsonText);
    return res.status(200).json({ itinerary });
  } catch (error: any) {
    console.error('Error in itinerary handler:', error);
    return res.status(500).json({ error: 'Failed to generate itinerary: ' + error.message });
  }
}