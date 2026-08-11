export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emirate, interest, duration } = req.body || {};

  try {
    const responseData = {
      itinerary: {
        title: `${duration || 1}-Day ${interest || 'Tour'} in ${emirate || 'UAE'}`,
        summary: `Custom AI itinerary generated for exploring ${emirate || 'the UAE'} focused on ${interest || 'Sightseeing'}.`,
        stops: [
          {
            day: 1,
            timing: "Morning",
            name: `${emirate !== 'All UAE' ? emirate : 'UAE'} Cultural Center`,
            emirate: emirate || "Abu Dhabi",
            note: "Start your journey experiencing local heritage and key landmarks."
          },
          {
            day: 1,
            timing: "Afternoon",
            name: `${interest} Scenic Spot`,
            emirate: emirate || "Dubai",
            note: "Enjoy scenic views and interactive local exhibits."
          }
        ]
      }
    };

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate itinerary' });
  }
}