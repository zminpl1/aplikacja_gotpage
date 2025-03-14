"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, MapPin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import ListingSkeleton from "@/components/skeletons/listing-skeleton"

// Mock data for featured listings
const featuredListings = [
  {
    id: 1,
    title: "Premium Office Space",
    description: "Modern office space with all amenities in the heart of downtown.",
    image: "/placeholder.svg?height=200&width=300",
    price: "4,500 zł/miesiąc",
    location: "Centrum Biznesowe",
    category: "Real Estate",
    rating: 4.8,
    reviews: 24,
    featured: true,
    business: {
      name: "Prime Properties",
      verified: true,
    },
  },
  {
    id: 2,
    title: "Professional Web Design Services",
    description: "Custom web design and development for businesses of all sizes.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Od 3,999 zł",
    location: "Zdalnie / Cała Polska",
    category: "Services",
    rating: 4.9,
    reviews: 56,
    featured: true,
    business: {
      name: "Digital Creatives",
      verified: true,
    },
  },
  {
    id: 3,
    title: "Vintage Furniture Collection",
    description: "Authentic mid-century modern furniture pieces in excellent condition.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Różne ceny",
    location: "Dzielnica Artystyczna",
    category: "Retail",
    rating: 4.7,
    reviews: 18,
    featured: true,
    business: {
      name: "Retro Furnishings",
      verified: false,
    },
  },
  {
    id: 4,
    title: "Marketing Consultation",
    description: "Strategic marketing consultation to grow your business and increase ROI.",
    image: "/placeholder.svg?height=200&width=300",
    price: "550 zł/godzina",
    location: "Centrum Technologiczne",
    category: "Services",
    rating: 5.0,
    reviews: 32,
    featured: true,
    business: {
      name: "Growth Strategies",
      verified: true,
    },
  },
  {
    id: 5,
    title: "Apartament w centrum miasta",
    description: "Luksusowy apartament z 2 sypialniami, w pełni umeblowany, z widokiem na miasto.",
    image: "/placeholder.svg?height=200&width=300",
    price: "3,200 zł/miesiąc",
    location: "Śródmieście",
    category: "Accommodation",
    rating: 4.6,
    reviews: 15,
    featured: true,
    business: {
      name: "City Apartments",
      verified: true,
    },
  },
  {
    id: 6,
    title: "Samochód na wynajem - Audi A6",
    description: "Elegancki Audi A6 2023 na wynajem krótko- i długoterminowy.",
    image: "/placeholder.svg?height=200&width=300",
    price: "350 zł/dzień",
    location: "Warszawa",
    category: "Automotive",
    rating: 4.9,
    reviews: 27,
    featured: true,
    business: {
      name: "Premium Car Rental",
      verified: true,
    },
  },
]

export default function FeaturedListings() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <ListingSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {featuredListings.slice(0, 4).map((listing) => (
        <Card
          key={listing.id}
          className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
        >
          <div className="relative">
            <Badge className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700">{t("common.featured")}</Badge>
            <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" />
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
              <Badge variant="outline" className="ml-2 text-xs">
                {listing.category}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{listing.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1 text-pink-500" />
              {listing.location}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium text-pink-500">{listing.price}</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm">
                  {listing.rating} ({listing.reviews})
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="text-sm">
              {listing.business.name}
              {listing.business.verified && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {t("common.verified")}
                </Badge>
              )}
            </div>
            <Link href={`/listings/${listing.id}`} className="text-pink-500 hover:text-pink-600">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

