import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emirate, interest, duration } = req.body;
  const daysCount = parseInt(duration) || 1;

  // Dynamically generate stops for each requested day
  const stops = [];
  for (let d = 1; d <= daysCount; d++) {
    stops.push(
      {
        day: d,
        timing: "Morning",
        name: `${emirate} ${interest} Tour - Part 1`,
        emirate: emirate === "All UAE" ? "Dubai" : emirate,
        note: `Explore top ${interest.toLowerCase()} locations across ${emirate} on Day ${d}.`
      },
      {
        day: d,
        timing: "Afternoon",
        name: `${emirate} Scenic Landmark Visit`,
        emirate: emirate === "All UAE" ? "Abu Dhabi" : emirate,
        note: `Enjoy curated cultural and natural highlights during the afternoon of Day ${d}.`
      }
    );
  }

  return res.status(200).json({
    itinerary: {
      title: `${daysCount}-Day ${interest} in ${emirate}`,
      summary: `A custom ${daysCount}-day itinerary focused on ${interest} in ${emirate}.`,
      stops: stops
    }
  });
}