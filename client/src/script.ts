export interface ItineraryParams {
  emirate: string;
  interest: string;
  duration: number;
}

export async function generateItinerary(params: ItineraryParams) {
  const response = await fetch('/api/itinerary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to generate itinerary from AI API');
  }

  const data = await response.json();
  return data.itinerary;
}