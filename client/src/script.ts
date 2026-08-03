/**
 * Voyage UAE — Atlas of Warm Stone.
 * This file keeps the itinerary data and travel-plan logic separate from the page UI.
 */

export const emirateOptions = [
  "All UAE",
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ras Al Khaimah",
  "Fujairah",
  "Ajman",
  "Umm Al Quwain",
] as const;

export const interestOptions = [
  "Culture & Heritage",
  "Nature & Mountains",
  "Modern Landmarks",
  "Family Leisure",
] as const;

export const durationOptions = ["1 Day", "3 Days", "5 Days"] as const;

export type Emirate = (typeof emirateOptions)[number];
export type Interest = (typeof interestOptions)[number];
export type Duration = (typeof durationOptions)[number];

type Landmark = {
  name: string;
  emirate: Exclude<Emirate, "All UAE">;
  interests: Interest[];
  note: string;
};

export type ItineraryStop = Landmark & {
  day: number;
  timing: "Morning" | "Afternoon";
};

export type Itinerary = {
  title: string;
  summary: string;
  stops: ItineraryStop[];
};

const landmarks: Landmark[] = [
  {
    name: "Sheikh Zayed Grand Mosque",
    emirate: "Abu Dhabi",
    interests: ["Culture & Heritage"],
    note: "Start with the mosque’s white domes and peaceful open courtyards.",
  },
  {
    name: "Louvre Abu Dhabi",
    emirate: "Abu Dhabi",
    interests: ["Culture & Heritage", "Modern Landmarks"],
    note: "Explore art and the shade patterns under its distinctive dome.",
  },
  {
    name: "Qasr Al Hosn",
    emirate: "Abu Dhabi",
    interests: ["Culture & Heritage"],
    note: "Learn about Abu Dhabi’s earliest stone building and its history.",
  },
  {
    name: "Eastern Mangroves",
    emirate: "Abu Dhabi",
    interests: ["Nature & Mountains"],
    note: "Take a calm waterside break among mangrove trees.",
  },
  {
    name: "Yas Island",
    emirate: "Abu Dhabi",
    interests: ["Family Leisure", "Modern Landmarks"],
    note: "Choose an activity area that suits the group’s pace.",
  },
  {
    name: "Al Fahidi Historical Neighbourhood",
    emirate: "Dubai",
    interests: ["Culture & Heritage"],
    note: "Walk the shaded lanes and notice the traditional wind towers.",
  },
  {
    name: "Dubai Creek",
    emirate: "Dubai",
    interests: ["Culture & Heritage", "Family Leisure"],
    note: "Follow the waterway that connects old trading districts.",
  },
  {
    name: "Museum of the Future",
    emirate: "Dubai",
    interests: ["Modern Landmarks"],
    note: "See an imaginative building that begins conversations about tomorrow.",
  },
  {
    name: "Ras Al Khor Wildlife Sanctuary",
    emirate: "Dubai",
    interests: ["Nature & Mountains"],
    note: "Pause at a birdwatching area near the city.",
  },
  {
    name: "Dubai Aquarium & Underwater Zoo",
    emirate: "Dubai",
    interests: ["Family Leisure"],
    note: "Add an indoor wildlife activity for a family-friendly afternoon.",
  },
  {
    name: "Heart of Sharjah",
    emirate: "Sharjah",
    interests: ["Culture & Heritage"],
    note: "Explore restored lanes, courtyards, and cultural spaces.",
  },
  {
    name: "Al Noor Island",
    emirate: "Sharjah",
    interests: ["Nature & Mountains", "Family Leisure"],
    note: "Walk among gardens and artful outdoor spaces by the water.",
  },
  {
    name: "House of Wisdom",
    emirate: "Sharjah",
    interests: ["Modern Landmarks", "Culture & Heritage"],
    note: "Visit a light-filled learning space built around reading and ideas.",
  },
  {
    name: "Wasit Wetland Centre",
    emirate: "Sharjah",
    interests: ["Nature & Mountains"],
    note: "Learn about wetland birds in a quiet nature setting.",
  },
  {
    name: "Al Majaz Waterfront",
    emirate: "Sharjah",
    interests: ["Family Leisure"],
    note: "Leave time for a relaxed waterside walk and open views.",
  },
  {
    name: "Jebel Jais",
    emirate: "Ras Al Khaimah",
    interests: ["Nature & Mountains"],
    note: "Follow the mountain road for wide views over rocky ridges.",
  },
  {
    name: "Dhayah Fort",
    emirate: "Ras Al Khaimah",
    interests: ["Culture & Heritage"],
    note: "Climb toward a historic fort with views of palms and hills.",
  },
  {
    name: "Al Hamra Village",
    emirate: "Ras Al Khaimah",
    interests: ["Culture & Heritage"],
    note: "Discover a traditional coastal settlement and its story.",
  },
  {
    name: "Jebel Jais Viewing Deck Park",
    emirate: "Ras Al Khaimah",
    interests: ["Family Leisure", "Nature & Mountains"],
    note: "Plan a scenic pause with mountain air and open viewpoints.",
  },
  {
    name: "Al Bidyah Mosque",
    emirate: "Fujairah",
    interests: ["Culture & Heritage"],
    note: "Visit the UAE’s oldest known mosque and its small hilltop setting.",
  },
  {
    name: "Fujairah Fort",
    emirate: "Fujairah",
    interests: ["Culture & Heritage"],
    note: "See a restored fort that tells a local story of defence and trade.",
  },
  {
    name: "Wadi Wurayah",
    emirate: "Fujairah",
    interests: ["Nature & Mountains"],
    note: "Use a suitable local route to appreciate the wadi landscape.",
  },
  {
    name: "Al Aqah Beach",
    emirate: "Fujairah",
    interests: ["Family Leisure", "Nature & Mountains"],
    note: "Balance heritage stops with a quiet coastal afternoon.",
  },
  {
    name: "Sheikh Zayed Mosque, Fujairah",
    emirate: "Fujairah",
    interests: ["Modern Landmarks", "Culture & Heritage"],
    note: "Notice the scale and symmetry of this modern mosque.",
  },
  {
    name: "Ajman Museum",
    emirate: "Ajman",
    interests: ["Culture & Heritage"],
    note: "Learn about local life inside a historic fort setting.",
  },
  {
    name: "Al Zorah Nature Reserve",
    emirate: "Ajman",
    interests: ["Nature & Mountains"],
    note: "Look out for mangroves and birdlife in a protected coastal area.",
  },
  {
    name: "Ajman Corniche",
    emirate: "Ajman",
    interests: ["Family Leisure"],
    note: "Keep the schedule easy with a seaside walk and open space.",
  },
  {
    name: "Al Zorah Marina",
    emirate: "Ajman",
    interests: ["Modern Landmarks", "Family Leisure"],
    note: "Pair the coastal setting with a relaxed modern leisure stop.",
  },
  {
    name: "Umm Al Quwain National Museum",
    emirate: "Umm Al Quwain",
    interests: ["Culture & Heritage"],
    note: "Explore a fort museum that introduces the emirate’s history.",
  },
  {
    name: "Al Sinniyah Island",
    emirate: "Umm Al Quwain",
    interests: ["Nature & Mountains"],
    note: "Choose a responsible nature visit with respect for wildlife areas.",
  },
  {
    name: "Dreamland Aqua Park",
    emirate: "Umm Al Quwain",
    interests: ["Family Leisure"],
    note: "Add a family activity after a morning of local exploration.",
  },
  {
    name: "Falaj Al Mualla Fort",
    emirate: "Umm Al Quwain",
    interests: ["Culture & Heritage", "Modern Landmarks"],
    note: "See a carefully restored fort in an inland town.",
  },
];

const dayCounts: Record<Duration, number> = {
  "1 Day": 1,
  "3 Days": 3,
  "5 Days": 5,
};

const emirateOrder = emirateOptions.filter(
  (emirate): emirate is Exclude<Emirate, "All UAE"> => emirate !== "All UAE",
);

function interleaveByEmirate(items: Landmark[]) {
  const buckets = emirateOrder.map((emirate) =>
    items.filter((item) => item.emirate === emirate),
  );
  const ordered: Landmark[] = [];
  const longestBucket = Math.max(...buckets.map((bucket) => bucket.length), 0);

  for (let index = 0; index < longestBucket; index += 1) {
    buckets.forEach((bucket) => {
      if (bucket[index]) ordered.push(bucket[index]);
    });
  }

  return ordered;
}

export function generateItinerary(
  emirate: Emirate,
  interest: Interest,
  duration: Duration,
): Itinerary {
  const sameEmirate = landmarks.filter(
    (landmark) => emirate === "All UAE" || landmark.emirate === emirate,
  );
  const matchingInterest = sameEmirate.filter((landmark) =>
    landmark.interests.includes(interest),
  );
  const selectedPool = matchingInterest.length > 0 ? matchingInterest : sameEmirate;
  const pool =
    emirate === "All UAE" ? interleaveByEmirate(selectedPool) : selectedPool;
  const days = dayCounts[duration];
  const stops = Array.from({ length: days * 2 }, (_, index) => {
    const landmark = pool[index % pool.length];
    return {
      ...landmark,
      day: Math.floor(index / 2) + 1,
      timing: (index % 2 === 0 ? "Morning" : "Afternoon") as ItineraryStop["timing"],
    };
  });

  const routeScope = emirate === "All UAE" ? "across the UAE" : `in ${emirate}`;
  return {
    title: `${duration} ${interest.toLowerCase()} route ${routeScope}`,
    summary: `A simple sample plan with two relaxed stops per day. Adjust travel times and bookings before you go.`,
    stops,
  };
}
