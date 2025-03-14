// Mock data for users
const users = [
  {
    id: 1,
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    avatar: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=400&width=1200",
    location: "Warszawa, Polska",
    bio: "Pasjonat nieruchomości i technologii. Szukam ciekawych ofert i usług w mojej okolicy.",
    memberSince: "Styczeń 2022",
    phone: "+48 123 456 789",
    listings: [
      {
        id: 1,
        title: "Poszukuję mieszkania do wynajęcia",
        description:
          "Szukam 2-pokojowego mieszkania w centrum Warszawy, najlepiej umeblowanego, do 3000 zł miesięcznie.",
        image: "/placeholder.svg?height=200&width=300",
        price: "Do 3000 zł/miesiąc",
        category: "Real Estate",
        location: "Warszawa Centrum",
        postedAt: "2 dni temu",
        views: 87,
        inquiries: 5,
      },
      {
        id: 2,
        title: "Sprzedam rower górski",
        description: "Sprzedam rower górski marki Trek, model 2021, używany tylko kilka razy, stan idealny.",
        image: "/placeholder.svg?height=200&width=300",
        price: "2,500 zł",
        category: "Sports",
        location: "Warszawa Mokotów",
        postedAt: "1 tydzień temu",
        views: 124,
        inquiries: 8,
      },
    ],
    savedListings: [
      {
        id: 101,
        title: "Apartament w centrum miasta",
        description: "Luksusowy apartament z 2 sypialniami, w pełni umeblowany, z widokiem na miasto.",
        image: "/placeholder.svg?height=200&width=300",
        price: "3,200 zł/miesiąc",
        location: "Śródmieście",
        category: "Accommodation",
        business: {
          name: "City Apartments",
          verified: true,
        },
        savedAt: "3 dni temu",
      },
      {
        id: 102,
        title: "Usługi projektowania graficznego",
        description:
          "Profesjonalne usługi projektowania graficznego dla brandingu, materiałów marketingowych i zasobów cyfrowych.",
        image: "/placeholder.svg?height=200&width=300",
        price: "250 zł/godzina",
        location: "Dzielnica Kreatywna",
        category: "Services",
        business: {
          name: "DesignWorks Studio",
          verified: true,
        },
        savedAt: "1 tydzień temu",
      },
      {
        id: 103,
        title: "Samochód na wynajem - Audi A6",
        description: "Elegancki Audi A6 2023 na wynajem krótko- i długoterminowy.",
        image: "/placeholder.svg?height=200&width=300",
        price: "350 zł/dzień",
        location: "Warszawa",
        category: "Automotive",
        business: {
          name: "Premium Car Rental",
          verified: true,
        },
        savedAt: "2 tygodnie temu",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "view",
        title: "Viewed listing: Apartament w centrum miasta",
        time: "2 godziny temu",
      },
      {
        id: 2,
        type: "save",
        title: "Saved listing: Usługi projektowania graficznego",
        time: "3 dni temu",
      },
      {
        id: 3,
        type: "message",
        title: "Sent message to: Premium Car Rental",
        time: "5 dni temu",
      },
      {
        id: 4,
        type: "listing",
        title: "Created listing: Poszukuję mieszkania do wynajęcia",
        time: "1 tydzień temu",
      },
    ],
    reviews: [
      {
        id: 1,
        business: {
          name: "City Apartments",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-11-15",
        content:
          "Świetna obsługa i piękne apartamenty. Polecam każdemu, kto szuka komfortowego zakwaterowania w centrum miasta.",
      },
      {
        id: 2,
        business: {
          name: "Premium Car Rental",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        date: "2023-09-28",
        content:
          "Dobre samochody i profesjonalna obsługa. Jedyny minus to trochę wyższe ceny niż u konkurencji, ale jakość jest warta swojej ceny.",
      },
    ],
  },
  // More users...
]

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: "Digital Creatives",
    description:
      "Full-service digital agency offering web design, development, and digital marketing solutions for businesses of all sizes. We specialize in creating modern, responsive websites and effective digital marketing campaigns.",
    logo: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=400&width=1200",
    category: "Technology",
    subcategory: "Digital Agency",
    location: "ul. Marszałkowska 142, 00-061 Warszawa",
    phone: "+48 22 123 45 67",
    email: "contact@digitalcreatives.pl",
    website: "www.digitalcreatives.pl",
    nip: "1234567890",
    workingHours: [
      { day: "Monday - Friday", hours: "9:00 - 18:00" },
      { day: "Saturday", hours: "10:00 - 14:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    socialMedia: {
      facebook: "facebook.com/digitalcreatives",
      instagram: "instagram.com/digitalcreatives",
      linkedin: "linkedin.com/company/digitalcreatives",
      twitter: "twitter.com/digitalcreatives",
    },
    rating: 4.9,
    reviews: 89,
    verified: true,
    founded: "2015",
    employees: "15-30",
    listingsCount: 12,
    viewsThisMonth: 1245,
    contactsThisMonth: 37,
    listings: [
      {
        id: 1,
        title: "Professional Web Design Services",
        description: "Custom web design and development for businesses of all sizes.",
        image: "/placeholder.svg?height=200&width=300",
        price: "Od 3,999 zł",
        category: "Services",
        featured: true,
        views: 342,
        inquiries: 15,
      },
      {
        id: 2,
        title: "SEO & Content Marketing Package",
        description: "Comprehensive SEO and content marketing services to improve your online visibility.",
        image: "/placeholder.svg?height=200&width=300",
        price: "2,500 zł/miesiąc",
        category: "Marketing",
        featured: false,
        views: 187,
        inquiries: 8,
      },
      {
        id: 3,
        title: "E-commerce Website Development",
        description: "Custom e-commerce solutions with payment integration and inventory management.",
        image: "/placeholder.svg?height=200&width=300",
        price: "Od 8,000 zł",
        category: "Services",
        featured: false,
        views: 213,
        inquiries: 11,
      },
    ],
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Tomasz Kowalski",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-12-15",
        content:
          "Świetna firma! Stworzyli dla nas wspaniałą stronę internetową, która znacznie zwiększyła naszą konwersję. Profesjonalna obsługa i terminowa realizacja.",
      },
      {
        id: 2,
        user: {
          name: "Anna Nowak",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        date: "2023-11-28",
        content:
          "Dobra współpraca i komunikacja. Strona wygląda świetnie, choć proces trwał nieco dłużej niż oczekiwałam. Ogólnie polecam.",
      },
      {
        id: 3,
        user: {
          name: "Marek Wiśniewski",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-10-10",
        content:
          "Profesjonalne podejście do klienta. Kampania marketingowa, którą dla nas przygotowali, przyniosła świetne rezultaty. Z pewnością będziemy kontynuować współpracę.",
      },
    ],
  },
  // More businesses...
]

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Premium Office Space",
    description:
      "Modern office space with all amenities in the heart of downtown. Features include high-speed internet, meeting rooms, kitchen facilities, and 24/7 access. Perfect for small to medium-sized businesses looking for a professional environment.\n\nThe space is approximately 120 square meters and can accommodate up to 15 workstations. It's located on the 5th floor with elevator access and has large windows providing plenty of natural light.\n\nUtilities are included in the price, and there's a minimum 6-month lease requirement.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800&text=Office+Interior",
      "/placeholder.svg?height=600&width=800&text=Meeting+Room",
      "/placeholder.svg?height=600&width=800&text=Kitchen+Area",
    ],
    price: "4,500 zł/miesiąc",
    location: "Centrum Biznesowe, Warszawa",
    category: "Real Estate",
    postedAt: "3 dni temu",
    featured: true,
    rating: 4.8,
    reviewsCount: 12,
    views: 342,
    inquiries: 15,
    business: {
      id: 2,
      name: "Prime Properties",
      logo: "/placeholder.svg?height=80&width=80",
      verified: true,
      rating: 4.9,
      reviewsCount: 87,
      location: "ul. Złota 44, 00-120 Warszawa",
      phone: "+48 22 987 65 43",
      email: "contact@primeproperties.pl",
      website: "www.primeproperties.pl",
      category: "Real Estate",
    },
    reviews: [
      {
        id: 1,
        user: {
          name: "Piotr Nowak",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-11-20",
        content:
          "Świetna lokalizacja i przestrzeń biurowa. Wszystko zgodnie z opisem, a obsługa bardzo pomocna. Polecam!",
      },
      {
        id: 2,
        user: {
          name: "Magdalena Kowalczyk",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        date: "2023-10-15",
        content:
          "Dobre biuro w centrum miasta. Jedyny minus to ograniczona liczba miejsc parkingowych, ale sama przestrzeń jest bardzo dobra.",
      },
    ],
  },
  // More listings...
]

// Mock data service functions
export const getUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === id)
      if (user) {
        resolve(user)
      } else {
        reject(new Error("User not found"))
      }
    }, 500)
  })
}

export const getBusinessById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const business = businesses.find((b) => b.id === id)
      if (business) {
        resolve(business)
      } else {
        reject(new Error("Business not found"))
      }
    }, 500)
  })
}

export const getListingById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const listing = listings.find((l) => l.id === id)
      if (listing) {
        resolve(listing)
      } else {
        reject(new Error("Listing not found"))
      }
    }, 500)
  })
}

