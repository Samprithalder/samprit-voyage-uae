export type Emirate = string;
export type Interest = string;
export type Duration = string;

export const emirateOptions: Emirate[] = [
  "All UAE",
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export const interestOptions: Interest[] = [
  "Culture & Heritage",
  "Nature & Mountains",
  "Modern Landmarks",
];

export const durationOptions: Duration[] = ["1 Day", "3 Days", "5 Days"];

export interface ItineraryParams {
  emirate: string;
  interest: string;
  duration: number;
}

export async function generateItinerary(params: ItineraryParams) {
  try {
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
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return null;
  }
}