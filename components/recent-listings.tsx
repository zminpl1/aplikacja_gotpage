"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import ListingSkeleton from "@/components/skeletons/listing-skeleton"

// Mock data for recent listings
const recentListings = [
  {
    id: 101,
    title: "Usługi projektowania graficznego",
    description:
      "Profesjonalne usługi projektowania graficznego dla brandingu, materiałów marketingowych i zasobów cyfrowych.",
    image: "/placeholder.svg?height=200&width=300",
    price: "250 zł/godzina",
    location: "Dzielnica Kreatywna",
    category: "Services",
    postedAt: "2 godziny temu",
    business: {
      name: "DesignWorks Studio",
      verified: true,
    },
  },
  {
    id: 102,
    title: "Miejsce do coworkingu",
    description:
      "Elastyczna przestrzeń biurowa w nowoczesnym środowisku coworkingowym z szybkim internetem i udogodnieniami.",
    image: "/placeholder.svg?height=200&width=300",
    price: "89 zł/dzień",
    location: "Hub Innowacji",
    category: "Real Estate",
    postedAt: "5 godzin temu",
    business: {
      name: "WorkSpace Collective",
      verified: true,
    },
  },
  {
    id: 103,
    title: "Ręcznie robione wyroby skórzane",
    description: "Artystyczne skórzane portfele, torby i akcesoria wykonane ręcznie z najwyższej jakości materiałów.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Różne ceny",
    location: "Dzielnica Rzemieślnicza",
    category: "Retail",
    postedAt: "8 godzin temu",
    business: {
      name: "Leather & Co.",
      verified: false,
    },
  },
  {
    id: 104,
    title: "Zarządzanie mediami społecznościowymi",
    description:
      "Kompleksowe usługi zarządzania mediami społecznościowymi, aby zwiększyć Twoją obecność online i zaangażowanie.",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,800 zł/miesiąc",
    location: "Dzielnica Cyfrowa",
    category: "Marketing",
    postedAt: "12 godzin temu",
    business: {
      name: "Social Boost",
      verified: true,
    },
  },
  {
    id: 105,
    title: "Ekologiczne usługi cateringowe",
    description:
      "Catering od gospodarstwa do stołu na wydarzenia i funkcje korporacyjne, wykorzystujący lokalnie pozyskiwane składniki.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Wycena indywidualna",
    location: "Aleja Kulinarna",
    category: "Food & Beverage",
    postedAt: "1 dzień temu",
    business: {
      name: "Green Plate Catering",
      verified: true,
    },
  },
  {
    id: 106,
    title: "Wynajem sprzętu fotograficznego",
    description: "Profesjonalny sprzęt fotograficzny dostępny do wynajęcia na dzień lub tydzień.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Od 180 zł/dzień",
    location: "Dzielnica Medialna",
    category: "Equipment",
    postedAt: "1 dzień temu",
    business: {
      name: "Lens & Light",
      verified: true,
    },
  },
  {
    id: 107,
    title: "Domek letniskowy nad jeziorem",
    description: "Przytulny domek letniskowy z 3 sypialniami, bezpośrednim dostępem do jeziora i prywatnym pomostem.",
    image: "/placeholder.svg?height=200&width=300",
    price: "450 zł/noc",
    location: "Jezioro Białe",
    category: "Accommodation",
    postedAt: "1 dzień temu",
    business: {
      name: "Lake Retreats",
      verified: true,
    },
  },
  {
    id: 108,
    title: "Transport mebli i przeprowadzki",
    description: "Profesjonalne usługi transportu mebli i przeprowadzek na terenie całego kraju.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Od 300 zł",
    location: "Cała Polska",
    category: "Transport",
    postedAt: "2 dni temu",
    business: {
      name: "Move It Pro",
      verified: true,
    },
  },
]

export default function RecentListings() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ListingSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentListings.slice(0, 6).map((listing) => (
        <Card
          key={listing.id}
          className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
        >
          <div className="relative">
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
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {listing.postedAt}
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

