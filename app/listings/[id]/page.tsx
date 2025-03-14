"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  Share2,
  Bookmark,
  Heart,
  CheckCircle,
  Building,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"

// Mock data service
import { getListingById } from "@/lib/data-service"

export default function ListingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const id = params.id as string

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      try {
        const data = await getListingById(Number.parseInt(id))
        setListing(data)
      } catch (err) {
        setError("Failed to load listing")
        console.error(err)
      } finally {
        // Simulate network delay
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchListing()
  }, [id])

  const nextImage = () => {
    if (listing && listing.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (listing && listing.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="w-full h-[400px] rounded-lg mb-4" />
              <div className="flex justify-between mb-6">
                <Skeleton className="h-10 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="w-full h-64 rounded-lg mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t("common.error")}</h1>
          <p className="text-muted-foreground mb-6">{error || t("listings.notFound")}</p>
          <button
            onClick={() => router.push("/listings")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
          >
            {t("listings.backToListings")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/listings" className="text-pink-500 hover:text-pink-600 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("listings.backToListings")}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Listing Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <div className="relative h-[400px]">
                <img
                  src={listing.images[currentImageIndex] || "/placeholder.svg?height=400&width=800"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {listing.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mb-6">
              <div className="flex gap-2">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("common.contact")}
                </Button>
                <Button variant="outline" onClick={() => setIsSaved(!isSaved)}>
                  <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-pink-500 text-pink-500" : ""}`} />
                  {isSaved ? t("listings.saved") : t("listings.save")}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Listing Title and Details */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <Badge className="text-sm bg-pink-600">{listing.category}</Badge>
              </div>
              <div className="flex items-center text-lg font-semibold text-pink-500 mb-2">{listing.price}</div>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                {listing.location}
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4 mr-1" />
                {listing.postedAt}
              </div>
            </div>

            {/* Listing Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("listings.description")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("listings.reviews")}</CardTitle>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold mr-1">{listing.rating}</span>
                  <span className="text-muted-foreground">
                    ({listing.reviewsCount} {t("common.reviews")})
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {listing.reviews && listing.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {listing.reviews.map((review: any) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.user.avatar} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.user.name}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground mt-2">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">{t("listings.noReviews")}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Business Info and Contact */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("listings.listedBy")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={listing.business.logo || "/placeholder.svg"} alt={listing.business.name} />
                    <AvatarFallback>{listing.business.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">{listing.business.name}</h3>
                      {listing.business.verified && <CheckCircle className="h-4 w-4 ml-1 text-pink-500" />}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>
                        {listing.business.rating} ({listing.business.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                    <span className="text-sm">{listing.business.category}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                    <span className="text-sm">{listing.business.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-sm">{listing.business.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-sm">{listing.business.email}</span>
                  </div>
                  {listing.business.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-pink-500 mr-2" />
                      <span className="text-sm">{listing.business.website}</span>
                    </div>
                  )}
                </div>

                <Link href={`/business/${listing.business.id}`}>
                  <Button variant="outline" className="w-full">
                    {t("listings.viewBusiness")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("listings.contactAboutListing")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.message")}</label>
                    <textarea
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={t("listings.messagePrompt")}
                    ></textarea>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">{t("listings.sendMessage")}</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

