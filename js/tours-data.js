const TOURS_DATA = [
  {
    id: "1",
    slug: "bali-rice-terraces-temple-tour",
    title: "Bali Rice Terraces & Sacred Temple Day Tour",
    shortDescription: "Explore the iconic Tegallalang rice terraces and Bali's most sacred temples on this intimate small-group guided tour.",
    description: "Immerse yourself in Bali's breathtaking natural beauty and rich spiritual culture on this full-day guided adventure. Wind through emerald-green terraced rice fields, witness ancient purification rituals at a 10th-century holy spring temple, and watch the day wind down beside a sea temple perched dramatically on a coastal rock. Your expert local guide brings Balinese history and mythology to life throughout the day, while the small group size ensures a personal, unhurried experience.",
    duration: "10 hours",
    durationHours: 10,
    maxGroupSize: 12,
    difficulty: "Easy",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 347,
    location: "Bali, Indonesia",
    category: "Cultural",
    meetingPoint: "Kuta Beach Hotel Lobby, Jl. Pantai Kuta, Kuta, Badung Regency",
    photos: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    ],
    highlights: [
      "Walk the narrow paths of the UNESCO-listed Tegallalang rice terraces",
      "Witness traditional purification rituals at Tirta Empul holy spring",
      "Explore the iconic Tanah Lot sea temple at sunset",
      "Traditional Balinese lunch with panoramic rice field views",
      "Small group of max 12 for a personalised experience"
    ],
    inclusions: [
      "Air-conditioned vehicle and driver",
      "English-speaking certified local guide",
      "Traditional Balinese lunch",
      "All entrance fees and temple donations",
      "Bottled water throughout the day",
      "Temple sarongs (if required)"
    ],
    exclusions: [
      "Hotel pickup outside Kuta/Seminyak (available for extra charge)",
      "Personal expenses and souvenirs",
      "Alcoholic beverages",
      "Gratuities (optional)"
    ],
    schedule: [
      { time: "8:00 AM", activity: "Hotel Pickup & Welcome", description: "Meet your guide at the lobby. Enjoy a brief introduction to the day's itinerary as you head north through Bali's lush countryside." },
      { time: "9:30 AM", activity: "Tegallalang Rice Terraces", description: "Arrive at the iconic UNESCO-listed terraces. Walk along narrow paths through emerald-green paddies and enjoy stunning photo opportunities with the valley backdrop." },
      { time: "11:00 AM", activity: "Tirta Empul Holy Spring Temple", description: "Visit Bali's most sacred water temple, built in 926 AD. Watch or participate in the traditional melukat purification ritual in the natural spring pools." },
      { time: "12:30 PM", activity: "Balinese Lunch", description: "Enjoy an authentic Balinese buffet lunch at a local restaurant with panoramic rice field views. Savour dishes like nasi campur, sate, and fresh tropical fruits." },
      { time: "2:00 PM", activity: "Ubud Town Exploration", description: "Explore Ubud's famous art market and streets. Browse hand-crafted batik textiles, wood carvings, and silver jewellery. Free time for shopping or a coffee at a local cafe." },
      { time: "4:00 PM", activity: "Tanah Lot Sea Temple", description: "Watch the late afternoon light fall over this iconic sea temple perched on a rocky coastal outcrop. The view is spectacular and perfect for photography." },
      { time: "6:00 PM", activity: "Return Hotel Drop-off", description: "Comfortable drop-off at your accommodation in the Kuta/Seminyak area after a wonderful day." }
    ],
    reviews: [
      { name: "Sarah M.", date: "January 2026", rating: 5, comment: "Absolutely incredible day! Our guide Wayan was so knowledgeable and funny. The rice terraces were breathtaking. Highly recommend to anyone visiting Bali!", avatar: "S" },
      { name: "James K.", date: "December 2025", rating: 5, comment: "Perfect blend of nature and culture. The small group size made it feel very personal. Lunch was delicious and the temples were fascinating.", avatar: "J" },
      { name: "Maria G.", date: "November 2025", rating: 4, comment: "Great tour overall. Only minor issue was traffic getting to Tanah Lot at sunset, but the temple itself was absolutely worth the wait.", avatar: "M" },
      { name: "Tom R.", date: "October 2025", rating: 5, comment: "Best day of our whole Bali trip. Guide was excellent, timing was perfect, and the scenery was out of this world. Will be booking again.", avatar: "T" }
    ],
    categories: ["Cultural", "Nature", "Sightseeing"],
    languages: ["English", "Spanish", "French"],
    cancellationPolicy: "Free cancellation up to 24 hours before the tour starts. No refund for cancellations made less than 24 hours before start time.",
    tags: ["Bali", "Rice Terraces", "Temples", "Cultural", "Nature"],
    featured: true
  },
  {
    id: "2",
    slug: "kyoto-temples-gardens-tour",
    title: "Kyoto Ancient Temples & Bamboo Grove Day Tour",
    shortDescription: "Journey through Kyoto's golden pavilions, zen rock gardens, and the enchanting Arashiyama bamboo grove with a local expert guide.",
    description: "Step back in time on this carefully curated tour of Kyoto's most iconic spiritual and natural landmarks. From the golden shimmer of Kinkaku-ji to the meditative stillness of Ryoan-ji's rock garden, and the towering green stalks of Arashiyama's bamboo grove — every moment of this day is designed to reveal the soul of Japan's ancient capital. Your knowledgeable guide shares centuries of history, temple etiquette, and the philosophy behind each remarkable site.",
    duration: "9 hours",
    durationHours: 9,
    maxGroupSize: 10,
    difficulty: "Easy",
    price: 95,
    originalPrice: 130,
    rating: 4.9,
    reviewCount: 512,
    location: "Kyoto, Japan",
    category: "Cultural",
    meetingPoint: "Kyoto Station Central Gate (Hachijo Exit), Main Concourse",
    photos: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
    ],
    highlights: [
      "Photograph the golden Kinkaku-ji (Golden Pavilion) reflected in its mirror pond",
      "Contemplate Ryoan-ji's famous 15-stone Zen rock garden",
      "Stroll the iconic Arashiyama bamboo grove",
      "Visit Fushimi Inari's endless torii gate tunnels",
      "Traditional matcha tea ceremony experience included"
    ],
    inclusions: [
      "Professional English-speaking guide",
      "All entrance fees to listed temples",
      "Traditional matcha tea ceremony",
      "IC transport card for local travel",
      "Detailed cultural and historical commentary",
      "Small-group experience (max 10 guests)"
    ],
    exclusions: [
      "Lunch (restaurant recommendations provided)",
      "Hotel pickup/drop-off",
      "Personal purchases at markets",
      "Gratuities (optional)"
    ],
    schedule: [
      { time: "8:30 AM", activity: "Meeting at Kyoto Station", description: "Meet your guide at the Hachijo Exit. Receive your IC card and a brief overview of the day's itinerary." },
      { time: "9:00 AM", activity: "Kinkaku-ji (Golden Pavilion)", description: "Visit the iconic three-storey golden pavilion, one of Japan's most photographed structures. Walk the tranquil garden surrounding the mirror pond." },
      { time: "10:30 AM", activity: "Ryoan-ji Zen Temple", description: "Experience the world-famous Karesansui (dry landscape) rock garden. Sit quietly and contemplate the 15 stones that can never all be viewed simultaneously." },
      { time: "12:00 PM", activity: "Nishiki Market", description: "Explore Kyoto's 'kitchen' — a narrow covered market with 400 years of history. Sample local street foods and browse fresh produce and pickled delicacies." },
      { time: "1:30 PM", activity: "Matcha Tea Ceremony", description: "Participate in a traditional tea ceremony hosted by a certified tea master. Learn the philosophy of wabi-sabi and enjoy hand-whisked matcha with wagashi sweets." },
      { time: "3:00 PM", activity: "Arashiyama Bamboo Grove", description: "Walk the famous pathway through towering bamboo stalks. The grove creates a breathtaking natural tunnel of swaying green light." },
      { time: "4:30 PM", activity: "Fushimi Inari Shrine", description: "Hike the lower trails through thousands of vermillion torii gates winding up the sacred Mount Inari. Spectacular for photography as the evening light filters through." },
      { time: "6:00 PM", activity: "End of Tour", description: "Tour concludes at Fushimi Inari Station with easy access back to central Kyoto." }
    ],
    reviews: [
      { name: "Elena P.", date: "February 2026", rating: 5, comment: "Our guide Kenji was phenomenal — his knowledge of Japanese history and culture was extraordinary. The tea ceremony was a highlight I'll never forget.", avatar: "E" },
      { name: "David L.", date: "January 2026", rating: 5, comment: "Perfect pacing throughout the day. Never felt rushed but covered so much. The bamboo grove early afternoon was magical with softer light.", avatar: "D" },
      { name: "Yuki A.", date: "December 2025", rating: 5, comment: "Even as a Japanese person, I learned so much about my own culture! The guide's storytelling made ancient history feel vivid and relevant.", avatar: "Y" },
      { name: "Claire B.", date: "November 2025", rating: 4, comment: "Wonderful tour. Only wish we had a little more time at Fushimi Inari — could have easily spent another hour there.", avatar: "C" }
    ],
    categories: ["Cultural", "History", "Nature"],
    languages: ["English", "Japanese", "Mandarin"],
    cancellationPolicy: "Free cancellation up to 48 hours before the tour starts. 50% refund for cancellations 24–48 hours before start time.",
    tags: ["Kyoto", "Japan", "Temples", "Bamboo", "Tea Ceremony"],
    featured: true
  },
  {
    id: "3",
    slug: "amalfi-coast-boat-hike-tour",
    title: "Amalfi Coast Boat Trip & Scenic Hike Day Tour",
    shortDescription: "Sail along the dramatic Amalfi coastline, swim in hidden sea caves, then hike the legendary Path of the Gods with breathtaking views.",
    description: "Experience the Amalfi Coast from the best possible angles — from the sea and from high above. Depart by private boat from Positano, cruising past cliffside villages and into sea caves glowing with turquoise water. After a swim stop and on-board lunch, join your guide for the famous Sentiero degli Dei (Path of the Gods) hike, with panoramic views of the Tyrrhenian Sea that will leave you speechless.",
    duration: "11 hours",
    durationHours: 11,
    maxGroupSize: 8,
    difficulty: "Moderate",
    price: 165,
    originalPrice: 210,
    rating: 4.9,
    reviewCount: 203,
    location: "Amalfi Coast, Italy",
    category: "Adventure",
    meetingPoint: "Positano Ferry Dock, Via Giovanni Marconi, Positano",
    photos: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80",
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80",
      "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=800&q=80",
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"
    ],
    highlights: [
      "Private boat cruise along the UNESCO-protected Amalfi Coast",
      "Swim in turquoise sea caves and grottos",
      "Hike the famous Path of the Gods (Sentiero degli Dei)",
      "Lunch on board with local Campanian wines",
      "Exclusive small group of maximum 8 guests"
    ],
    inclusions: [
      "Private licensed boat with skipper",
      "Certified mountain guide for hike",
      "On-board lunch with local wines and water",
      "Snorkelling equipment",
      "National park entrance fee",
      "Transfer from hike end point to Positano"
    ],
    exclusions: [
      "Hotel transfers (available on request)",
      "Travel insurance",
      "Personal equipment (hiking shoes recommended)",
      "Gratuities"
    ],
    schedule: [
      { time: "9:00 AM", activity: "Boat Departure from Positano", description: "Board your private boat at the Positano dock. Meet your skipper and set sail along the coast towards the first highlights." },
      { time: "9:30 AM", activity: "Grotta dello Smeraldo", description: "Enter the stunning Emerald Grotto, where daylight filters through an underwater cavity creating an ethereal green glow throughout the cave." },
      { time: "10:30 AM", activity: "Swimming Stop & Snorkelling", description: "Anchor in a secluded cove with crystal-clear water. Jump in for a swim or snorkel among colourful Mediterranean fish and underwater rock formations." },
      { time: "12:00 PM", activity: "Lunch on Board", description: "Enjoy a delicious spread of local bruschetta, fresh mozzarella, grilled vegetables, and seafood, paired with crisp Campanian white wine." },
      { time: "1:30 PM", activity: "Arrive at Praiano", description: "Dock at Praiano village and meet your mountain guide for the second part of the day's adventure." },
      { time: "2:00 PM", activity: "Path of the Gods Hike", description: "Hike the legendary Sentiero degli Dei — a 7.8 km trail carved into the cliffsides above the sea, with jaw-dropping panoramic views at every turn." },
      { time: "5:00 PM", activity: "Arrive Nocelle & Transfer", description: "Complete the hike in the hilltop village of Nocelle. Enjoy a well-earned gelato before your transfer back down to Positano." },
      { time: "6:00 PM", activity: "Return to Positano", description: "Arrive back in Positano, where the tour concludes at the ferry dock." }
    ],
    reviews: [
      { name: "Francesca D.", date: "September 2025", rating: 5, comment: "Truly the best day of my Italian trip. The boat was beautiful, the hike was challenging but manageable, and the views were beyond anything I'd imagined.", avatar: "F" },
      { name: "Michael T.", date: "August 2025", rating: 5, comment: "Our skipper Marco knew every hidden cove along the coast. The on-board lunch was exceptional — fresh, local, and generous. Worth every cent.", avatar: "M" },
      { name: "Sophia R.", date: "July 2025", rating: 5, comment: "Path of the Gods lived up to its name completely. We went in summer — do bring sun protection and good shoes. The guide was funny and very safe.", avatar: "S" },
      { name: "Alex H.", date: "June 2025", rating: 4, comment: "Spectacular experience overall. We got lucky with weather — check forecast before booking as the boat portion depends on sea conditions.", avatar: "A" }
    ],
    categories: ["Adventure", "Nature", "Water"],
    languages: ["English", "Italian", "German"],
    cancellationPolicy: "Free cancellation up to 72 hours before departure. Tours may be rescheduled due to adverse weather at no charge.",
    tags: ["Amalfi", "Italy", "Boat", "Hiking", "Coast"],
    featured: false
  },
  {
    id: "4",
    slug: "barcelona-gothic-tapas-tour",
    title: "Barcelona Gothic Quarter & Evening Tapas Walking Tour",
    shortDescription: "Uncover 2,000 years of hidden history in the Gothic Quarter's ancient lanes, then feast on authentic tapas and local wines with a local foodie guide.",
    description: "Barcelona's Barri Gòtic (Gothic Quarter) is one of Europe's best-preserved medieval city centres, with layers of Roman, Moorish, and Gothic history waiting beneath every cobblestone. This expertly guided walking tour peels back the centuries, leading you to hidden plazas and secret corners most tourists never find. As evening falls, the tour transitions into a curated tapas crawl through neighbourhood bars handpicked by your local guide — no tourist traps here.",
    duration: "5 hours",
    durationHours: 5,
    maxGroupSize: 14,
    difficulty: "Easy",
    price: 75,
    originalPrice: 95,
    rating: 4.7,
    reviewCount: 628,
    location: "Barcelona, Spain",
    category: "Food & Culture",
    meetingPoint: "Plaça de Sant Jaume (in front of City Hall main entrance)",
    photos: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
      "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80"
    ],
    highlights: [
      "Walk the hidden lanes of the 2,000-year-old Gothic Quarter",
      "Discover the original Roman city walls and temple ruins",
      "Visit the stunning Barcelona Cathedral interior",
      "Tapas crawl through three authentic neighbourhood bars",
      "Taste 8+ traditional Catalan tapas with paired local wines"
    ],
    inclusions: [
      "Expert local guide (historian and foodie)",
      "Entry to Barcelona Cathedral",
      "8+ tapas dishes across three bars",
      "3 glasses of local wine or soft drinks",
      "Written food and neighbourhood guide to take home",
      "Headsets for clear hearing in busy streets"
    ],
    exclusions: [
      "Additional drinks beyond the included allocation",
      "Hotel pickup (central meeting point provided)",
      "Transport between venues (all walking distance)"
    ],
    schedule: [
      { time: "6:00 PM", activity: "Meet at Plaça de Sant Jaume", description: "Meet your guide and group in front of the historic City Hall. Brief introductions and an overview of the city's Roman origins." },
      { time: "6:15 PM", activity: "Roman Ruins Walk", description: "Explore the remains of Barcino, the original Roman settlement — including intact 4th-century walls and the hidden Temple of Augustus." },
      { time: "7:00 PM", activity: "Gothic Quarter Hidden Lanes", description: "Wander through Carrer del Bisbe, Plaça de Sant Felip Neri, and the Jewish quarter (El Call), hearing stories of merchants, inquisitions, and city life." },
      { time: "7:45 PM", activity: "Barcelona Cathedral", description: "Enter the magnificent 13th-century Gothic cathedral. Visit the cloister with its famous geese pond, a tradition dating back 600 years." },
      { time: "8:30 PM", activity: "First Tapas Bar — Pintxos", description: "Stop at a lively pintxos bar for the first round of bites: pan con tomate, jamón croquetas, and patatas bravas — washed down with cold Estrella Damm." },
      { time: "9:15 PM", activity: "Second Bar — Catalan Classics", description: "Move to a neighbourhood bar for traditional Catalan tapas: escalivada, esqueixada de bacallà, and bombes, paired with a glass of Penedès white wine." },
      { time: "10:00 PM", activity: "Third Bar — Vermouth & Dessert Tapas", description: "End the evening with artisanal vermouth and sweet tapas — crema catalana, mel i mató, and house-made churros. Toast to a perfect Barcelona evening." },
      { time: "11:00 PM", activity: "Tour End", description: "Tour concludes in El Born neighbourhood, steps from the metro and Barcelona's best nightlife." }
    ],
    reviews: [
      { name: "Olivia N.", date: "February 2026", rating: 5, comment: "Absolutely brilliant evening. Our guide Ana was passionate, funny and incredibly knowledgeable. The food bars were genuine local spots — no tourist menus in sight!", avatar: "O" },
      { name: "Carlos V.", date: "January 2026", rating: 5, comment: "Did this with my partner for our anniversary. Perfect evening. History + incredible food. Couldn't fault a single thing about it.", avatar: "C" },
      { name: "Rachel S.", date: "December 2025", rating: 4, comment: "Great tour, loved the food focus. The Gothic Quarter history was interesting but we wish the tapas crawl was slightly longer!", avatar: "R" },
      { name: "Ben F.", date: "November 2025", rating: 5, comment: "Best food tour I've done in any city, anywhere. Third bar's vermouth selection was exceptional. Book this immediately.", avatar: "B" }
    ],
    categories: ["Food & Culture", "History", "Walking"],
    languages: ["English", "Spanish", "Catalan"],
    cancellationPolicy: "Free cancellation up to 24 hours before start time. No refunds for late cancellations.",
    tags: ["Barcelona", "Spain", "Tapas", "Gothic", "Food"],
    featured: true
  },
  {
    id: "5",
    slug: "santorini-sunset-caldera-cruise",
    title: "Santorini Sunset Caldera Sailing Cruise",
    shortDescription: "Sail the ancient volcanic caldera on a traditional Greek schooner, swim at the hot springs, and watch the famous Santorini sunset from the water.",
    description: "Santorini's dramatic caldera is the heart of the island's mystique — a flooded volcanic crater surrounded by sheer black and white cliffsides. This semi-private sailing cruise takes you directly into the caldera's heart, with stops at the volcanic hot springs, the white-pumice beaches of Nea Kameni, and a perfectly timed position to watch the legendary Santorini sunset. Includes a BBQ dinner on deck and unlimited drinks.",
    duration: "8 hours",
    durationHours: 8,
    maxGroupSize: 20,
    difficulty: "Easy",
    price: 145,
    originalPrice: 180,
    rating: 4.8,
    reviewCount: 489,
    location: "Santorini, Greece",
    category: "Sailing",
    meetingPoint: "Ammoudi Bay Harbour, below Oia village",
    photos: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?w=1200&q=80",
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80"
    ],
    highlights: [
      "Sail the dramatic Santorini caldera on a traditional schooner",
      "Swim in the natural volcanic hot springs of Palea Kameni",
      "Hike the volcanic crater of Nea Kameni island",
      "Watch the world-famous Santorini sunset from the water",
      "BBQ dinner on deck with unlimited wine, beer and soft drinks"
    ],
    inclusions: [
      "Semi-private sailing cruise (max 20 guests)",
      "BBQ dinner on board",
      "Unlimited wine, beer and soft drinks",
      "Snorkelling equipment",
      "Towels",
      "Guided volcanic island hike"
    ],
    exclusions: [
      "Hotel transfer to/from Ammoudi Bay",
      "Travel insurance",
      "Premium spirits (available to purchase)",
      "Gratuities"
    ],
    schedule: [
      { time: "3:00 PM", activity: "Boarding at Ammoudi Bay", description: "Board the traditional Greek schooner. Meet the crew, enjoy a welcome drink, and set sail into the stunning caldera." },
      { time: "4:00 PM", activity: "Nea Kameni Volcanic Island", description: "Dock at the active volcanic island. Hike the crater trail with your guide, learning about the island's fiery geological history." },
      { time: "5:00 PM", activity: "Hot Springs Swimming", description: "Swim from the boat to the natural thermal hot springs at Palea Kameni. The iron-rich waters give a distinct orange tinge to the sea around them." },
      { time: "6:00 PM", activity: "Thirassia Coastal Cruise", description: "Sail along the quiet, less-visited island of Thirassia with breathtaking views of the main caldera cliffs opposite." },
      { time: "7:00 PM", activity: "BBQ Dinner on Deck", description: "Anchor at a prime position in the caldera for dinner: grilled meats, Greek salad, tzatziki, pita, and fresh catch of the day — with wine flowing freely." },
      { time: "8:30 PM", activity: "Santorini Sunset", description: "Watch the legendary Santorini sunset paint the sky in shades of pink, orange and gold over the caldera. The most photographed moment in Greece." },
      { time: "10:00 PM", activity: "Return to Ammoudi Bay", description: "Sail back under the stars to Ammoudi Bay as the village lights reflect on the calm water." }
    ],
    reviews: [
      { name: "Isabella R.", date: "September 2025", rating: 5, comment: "Magical. There are no other words. The sunset from the water with wine in hand was the single most beautiful thing I've seen in my life.", avatar: "I" },
      { name: "George P.", date: "August 2025", rating: 5, comment: "Excellent boat, great crew, and the BBQ was far better than I expected for a boat tour. Do NOT miss the hot springs stop.", avatar: "G" },
      { name: "Lucy W.", date: "July 2025", rating: 5, comment: "Booked this for my partner's birthday. She cried watching the sunset. Absolutely perfect experience from start to finish.", avatar: "L" },
      { name: "Andreas K.", date: "June 2025", rating: 4, comment: "Wonderful cruise. Hot springs were a bit crowded with other boats at peak season, but still a unique experience. Sunset made up for everything.", avatar: "A" }
    ],
    categories: ["Sailing", "Nature", "Romantic"],
    languages: ["English", "Greek", "German"],
    cancellationPolicy: "Free cancellation up to 48 hours before departure. Rescheduling available due to weather conditions.",
    tags: ["Santorini", "Greece", "Sailing", "Sunset", "Caldera"],
    featured: true
  },
  {
    id: "6",
    slug: "machu-picchu-full-day-tour",
    title: "Machu Picchu Guided Full Day Tour from Cusco",
    shortDescription: "Take the legendary Vistadome train to Aguas Calientes and explore the ancient Incan citadel of Machu Picchu with an expert archaeologist guide.",
    description: "No trip to South America is complete without standing at the gates of Machu Picchu, the 15th-century Incan citadel perched dramatically in the Andes clouds. This all-inclusive full-day tour takes care of every logistical detail — from the scenic Vistadome train winding through the Sacred Valley to your expert guide's stories of Incan astronomy, architecture, and the mystery of why this city was abandoned. It's the day of a lifetime.",
    duration: "14 hours",
    durationHours: 14,
    maxGroupSize: 16,
    difficulty: "Moderate",
    price: 299,
    originalPrice: 380,
    rating: 4.9,
    reviewCount: 731,
    location: "Cusco, Peru",
    category: "Heritage",
    meetingPoint: "Cusco Poroy Train Station, Poroy District (30 min from Cusco city centre)",
    photos: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&q=80",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80"
    ],
    highlights: [
      "Round-trip on the scenic Vistadome panoramic train through the Andes",
      "Skip-the-line entry to Machu Picchu",
      "3-hour tour with a certified archaeologist guide",
      "Optional Sun Gate hike (Inti Punku) with panoramic citadel views",
      "Buffet lunch at Belmond Sanctuary Lodge (upgrade option)"
    ],
    inclusions: [
      "Round-trip Vistadome panoramic train (Poroy–Aguas Calientes)",
      "Round-trip bus from Aguas Calientes to Machu Picchu entrance",
      "Official Machu Picchu entrance ticket",
      "3-hour guided tour with certified archaeologist",
      "Packed breakfast",
      "Bottled water and snacks"
    ],
    exclusions: [
      "Lunch (optional upgrade to Belmond Lodge buffet available)",
      "Huayna Picchu mountain entry (limited slots, must book in advance)",
      "Travel insurance",
      "Personal items",
      "Gratuities"
    ],
    schedule: [
      { time: "5:30 AM", activity: "Hotel Pickup in Cusco", description: "Early morning pickup from your Cusco hotel. Transfer to Poroy train station with packed breakfast provided." },
      { time: "6:45 AM", activity: "Vistadome Train Departure", description: "Board the spectacular Vistadome panoramic train. Watch the Sacred Valley unfold through floor-to-ceiling windows as you descend from the Andes into the cloud forest." },
      { time: "9:30 AM", activity: "Arrive Aguas Calientes", description: "Arrive at the town of Aguas Calientes at the foot of Machu Picchu mountain. Board the shuttle bus for the 30-minute climb." },
      { time: "10:00 AM", activity: "Machu Picchu Entrance", description: "Enter the citadel through the Sun Gate and take in your first views of the legendary lost city in all its cloud-wreathed glory." },
      { time: "10:15 AM", activity: "Guided Archaeological Tour", description: "Your expert guide leads a 3-hour tour of the citadel's key areas — the Temple of the Sun, the Intihuatana stone, the agricultural terraces, and the residential quarters." },
      { time: "1:15 PM", activity: "Free Exploration Time", description: "Explore the citadel at your own pace. Hike the optional Sun Gate trail (45 min each way) for sweeping views over the entire site." },
      { time: "3:00 PM", activity: "Return to Aguas Calientes", description: "Descend by shuttle bus to Aguas Calientes for free time to browse the artisan markets and relax before the return train." },
      { time: "5:00 PM", activity: "Return Train Departure", description: "Board the return Vistadome train through the Sacred Valley as the Andes dusk casts golden light across the mountains." },
      { time: "8:00 PM", activity: "Hotel Drop-off in Cusco", description: "Return transfer to your Cusco accommodation after an extraordinary day." }
    ],
    reviews: [
      { name: "Hannah J.", date: "January 2026", rating: 5, comment: "Life-changing. Our guide Ricardo brought every stone of Machu Picchu to life with stories and genuine passion. Impeccably organised from start to finish.", avatar: "H" },
      { name: "Marco A.", date: "December 2025", rating: 5, comment: "Worth every penny. The Vistadome train alone is worth the trip. Seeing Machu Picchu emerge from the mist at sunrise — indescribable.", avatar: "M" },
      { name: "Priya K.", date: "November 2025", rating: 5, comment: "Flawless logistics on an incredibly complex day. Didn't have to think about a single thing. Just showed up and experienced magic.", avatar: "P" },
      { name: "Steven C.", date: "October 2025", rating: 4, comment: "Superb tour but be prepared for altitude — Cusco sits at 3,400m and you may feel some effects. Acclimatise for a day before booking.", avatar: "S" }
    ],
    categories: ["Heritage", "Adventure", "Nature"],
    languages: ["English", "Spanish", "Portuguese"],
    cancellationPolicy: "Free cancellation up to 72 hours before departure. No refunds after that due to train and entry ticket costs.",
    tags: ["Machu Picchu", "Peru", "Inca", "Heritage", "Andes"],
    featured: false
  },
  {
    id: "7",
    slug: "marrakech-medina-souks-tour",
    title: "Marrakech Medina, Souks & Moroccan Cooking Tour",
    shortDescription: "Plunge into the labyrinthine souks of Marrakech's UNESCO medina, visit the tanneries, and learn to cook a traditional Moroccan feast.",
    description: "Marrakech's medina is one of the world's great sensory experiences — a labyrinth of souks, riads, and mosques that has changed little since the 12th century. This immersive day tour pairs a guided medina walk (so you don't get lost!) with a hands-on Moroccan cooking class led by a local chef. Navigate spice markets, visit the famous leather tanneries, marvel at the Saadian Tombs, and then cook and eat an extraordinary meal together.",
    duration: "8 hours",
    durationHours: 8,
    maxGroupSize: 10,
    difficulty: "Easy",
    price: 85,
    originalPrice: 110,
    rating: 4.8,
    reviewCount: 415,
    location: "Marrakech, Morocco",
    category: "Food & Culture",
    meetingPoint: "Jemaa el-Fna Square, near the main Koutoubia Mosque entrance",
    photos: [
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1560258018-c7db7645254e?w=800&q=80",
      "https://images.unsplash.com/photo-1572791983100-7b47ef9c7e5e?w=800&q=80",
      "https://images.unsplash.com/photo-1519563912073-dcaedcd29a4b?w=800&q=80"
    ],
    highlights: [
      "Navigate the UNESCO-listed medina with an expert local guide",
      "Visit the famous Chouara leather tanneries",
      "Explore the spice and herb souks with a guide who knows every trader",
      "Hands-on Moroccan cooking class with a local chef in a traditional riad",
      "Feast on the dishes you cook for lunch — tagine, couscous, and bastilla"
    ],
    inclusions: [
      "Expert local medina guide",
      "All entrance fees (Saadian Tombs, tannery viewpoint)",
      "Moroccan cooking class with professional chef",
      "All cooking ingredients",
      "Lunch of the dishes prepared",
      "Mint tea and soft drinks"
    ],
    exclusions: [
      "Hotel transfers",
      "Additional purchases in the souks",
      "Alcoholic beverages",
      "Gratuities"
    ],
    schedule: [
      { time: "9:00 AM", activity: "Meet at Jemaa el-Fna", description: "Begin at the iconic Jemaa el-Fna square — the pulsing heart of Marrakech. Your guide introduces the medina's history and navigational secrets." },
      { time: "9:30 AM", activity: "Spice Market (Rahba Kedima)", description: "Enter the ancient spice market. Your guide explains dozens of Moroccan herbs and spices — from ras el hanout to argan oil — and their culinary and medicinal uses." },
      { time: "10:30 AM", activity: "Souk Quarter Exploration", description: "Wind through specialist souks — copper, lanterns, carpets, leather babouches — each quartier with its own craft guild unchanged for centuries." },
      { time: "11:00 AM", activity: "Chouara Leather Tanneries", description: "View the famous medieval tanneries from rooftop terraces. Watch craftsmen treating and dyeing leather in enormous stone vats using centuries-old techniques." },
      { time: "11:45 AM", activity: "Saadian Tombs", description: "Visit the spectacular 16th-century royal tombs, rediscovered in 1917 and renowned for their intricate cedar and marble craftsmanship." },
      { time: "12:30 PM", activity: "Moroccan Cooking Class", description: "Transfer to a beautiful traditional riad for a 2-hour hands-on cooking class. Learn to prepare chicken tagine with preserved lemons, vegetable couscous, and flaky bastilla pie." },
      { time: "2:30 PM", activity: "Feast Together", description: "Sit down and enjoy everything you've cooked — a proper Moroccan feast with mint tea, Moroccan bread, and a warm community atmosphere." },
      { time: "4:00 PM", activity: "Tour End", description: "Tour concludes at the riad. Walking directions back to your hotel or to central landmarks provided." }
    ],
    reviews: [
      { name: "Amelia C.", date: "February 2026", rating: 5, comment: "The cooking class alone was worth the entire price. Chef Fatima was patient, funny, and incredibly talented. Our tagine was perfect.", avatar: "A" },
      { name: "Paul M.", date: "January 2026", rating: 5, comment: "Essential Marrakech experience. Without a guide the medina is genuinely overwhelming — with one it's pure magic. Our guide Hassan knew everyone.", avatar: "P" },
      { name: "Nadia B.", date: "December 2025", rating: 5, comment: "We're vegetarians and they accommodated us beautifully without any fuss. The vegetable couscous was the best I've ever eaten.", avatar: "N" },
      { name: "Tim L.", date: "November 2025", rating: 4, comment: "Brilliant day. Tanneries were a highlight — nothing prepares you for that sight. The souks can be intense but your guide handles any hassle very diplomatically.", avatar: "T" }
    ],
    categories: ["Food & Culture", "History", "Sightseeing"],
    languages: ["English", "French", "Arabic"],
    cancellationPolicy: "Free cancellation up to 24 hours before start time.",
    tags: ["Marrakech", "Morocco", "Souks", "Cooking", "Medina"],
    featured: false
  },
  {
    id: "8",
    slug: "new-york-highlights-walking-tour",
    title: "New York City Iconic Highlights Day Tour",
    shortDescription: "From Central Park to the Brooklyn Bridge — hit all of NYC's must-see spots with a witty, passionate local guide who knows every story behind the skyline.",
    description: "New York City is arguably the most storied city in the world, and this carefully crafted day tour makes sure you see and understand its greatest landmarks — not just walk past them. From the arboreal calm of Central Park to the raw energy of Times Square, through the historic streets of Greenwich Village, across the Brooklyn Bridge with sweeping Manhattan views, and into the dynamic neighbourhoods of Brooklyn — this is New York at its exhilarating best.",
    duration: "9 hours",
    durationHours: 9,
    maxGroupSize: 15,
    difficulty: "Easy",
    price: 89,
    originalPrice: 115,
    rating: 4.7,
    reviewCount: 892,
    location: "New York City, USA",
    category: "Sightseeing",
    meetingPoint: "Central Park South — Grand Army Plaza (in front of The Plaza Hotel)",
    photos: [
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=800&q=80",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
      "https://images.unsplash.com/photo-1560175803-2a5d40f7e0e1?w=800&q=80"
    ],
    highlights: [
      "Morning walk through Central Park with stories from its 160-year history",
      "Times Square and the Midtown skyscraper canyon",
      "Greenwich Village — literary history, brownstones, and coffee culture",
      "Walk across the iconic Brooklyn Bridge with panoramic Manhattan views",
      "DUMBO neighbourhood lunch and waterfront views of Lower Manhattan"
    ],
    inclusions: [
      "Expert licensed New York City guide",
      "Central Park guided walk",
      "Unlimited subway and metro card for the day",
      "Entry to the 9/11 Memorial (exterior)",
      "Brooklyn Bridge walk",
      "DUMBO lunch recommendations and reservations"
    ],
    exclusions: [
      "Lunch (recommendations included with reservations made by guide)",
      "Museum entry fees",
      "Personal purchases",
      "Gratuities"
    ],
    schedule: [
      { time: "9:00 AM", activity: "Central Park Welcome", description: "Begin at Grand Army Plaza and walk through Central Park's southern end — the Pond, Wollman Rink (winter), Strawberry Fields, and Bethesda Terrace." },
      { time: "10:30 AM", activity: "Upper West Side to Midtown", description: "Walk or take the subway down through the Upper West Side. Pause at Columbus Circle and enter the spectacular energy of Midtown Manhattan." },
      { time: "11:00 AM", activity: "Times Square & 5th Avenue", description: "Navigate Times Square's sensory overload with your guide's cultural context. Walk the famous stretch of 5th Avenue past Rockefeller Center and St. Patrick's Cathedral." },
      { time: "12:00 PM", activity: "Greenwich Village", description: "Explore the tree-lined streets of the West Village — home to Washington Square Park, former Beat Generation haunts, and NYC's best cafes." },
      { time: "1:00 PM", activity: "Lunch Break (Independent)", description: "Free time for lunch in Greenwich Village. Your guide provides curated recommendations for every budget, with reservations pre-made." },
      { time: "2:30 PM", activity: "Lower Manhattan & 9/11 Memorial", description: "Walk through the Financial District's canyon of finance, past the Charging Bull and Fearless Girl, and pause at the solemn 9/11 Memorial reflecting pools." },
      { time: "3:30 PM", activity: "Brooklyn Bridge Walk", description: "Walk the full span of the iconic 1883 suspension bridge. Pause at the midpoint for the quintessential Manhattan skyline photograph." },
      { time: "4:30 PM", activity: "DUMBO, Brooklyn", description: "Explore the photogenic streets of DUMBO (Down Under the Manhattan Bridge Overpass) — home to art galleries, Jane's Carousel, and the famous Manhattan Bridge framed view." },
      { time: "6:00 PM", activity: "Tour End in Brooklyn", description: "Tour concludes in DUMBO with easy subway access back to Midtown or downtown Manhattan." }
    ],
    reviews: [
      { name: "Charlotte B.", date: "February 2026", rating: 5, comment: "Our guide Danny was absolutely fantastic — funny, sharp, and endlessly knowledgeable. He made the city feel alive. Best city tour we've ever done, anywhere.", avatar: "C" },
      { name: "Raj P.", date: "January 2026", rating: 5, comment: "Did this with my teenage kids and they actually loved it — which says everything. The Brooklyn Bridge walk was the highlight for all of us.", avatar: "R" },
      { name: "Anna T.", date: "December 2025", rating: 4, comment: "Excellent, comprehensive day. We covered so much ground. Only wish we'd had more time in the Village — could have spent hours there.", avatar: "A" },
      { name: "Mark D.", date: "November 2025", rating: 5, comment: "I've been to NYC four times but saw it completely differently with a knowledgeable local guide. The historical stories and context transformed every landmark.", avatar: "M" }
    ],
    categories: ["Sightseeing", "History", "Walking"],
    languages: ["English", "Spanish", "Mandarin"],
    cancellationPolicy: "Free cancellation up to 24 hours before start time.",
    tags: ["New York", "USA", "Walking", "Landmarks", "Brooklyn Bridge"],
    featured: false
  }
];

// Utility helpers used by both pages
function getStarHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    '<span class="stars" aria-label="' + rating + ' out of 5 stars">' +
    '★'.repeat(full) +
    (half ? '½' : '') +
    '☆'.repeat(empty) +
    '</span>'
  );
}

function formatPrice(price) {
  return '$' + price.toLocaleString();
}

function getDifficultyClass(difficulty) {
  return {
    'Easy': 'difficulty-easy',
    'Moderate': 'difficulty-moderate',
    'Challenging': 'difficulty-hard'
  }[difficulty] || 'difficulty-easy';
}

function getTourBySlug(slug) {
  return TOURS_DATA.find(t => t.slug === slug) || null;
}

function getTourById(id) {
  return TOURS_DATA.find(t => t.id === id) || null;
}
