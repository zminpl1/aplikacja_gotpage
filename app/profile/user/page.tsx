"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import {
  User,
  Settings,
  Bookmark,
  MessageSquare,
  FileText,
  Star,
  Clock,
  MapPin,
  Calendar,
  Edit,
  Heart,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

// Mock user data
const userData = {
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
      description: "Szukam 2-pokojowego mieszkania w centrum Warszawy, najlepiej umeblowanego, do 3000 zł miesięcznie.",
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
      icon: <Eye className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "save",
      title: "Saved listing: Usługi projektowania graficznego",
      time: "3 dni temu",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "message",
      title: "Sent message to: Premium Car Rental",
      time: "5 dni temu",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 4,
      type: "listing",
      title: "Created listing: Poszukuję mieszkania do wynajęcia",
      time: "1 tydzień temu",
      icon: <FileText className="h-4 w-4" />,
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
}

export default function UserProfilePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black">
        <img
          src={userData.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex items-end">
              <div className="mr-4">
                <Avatar className="w-24 h-24 border-4 border-background">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{userData.name}</h1>
                <div className="flex items-center mt-1 text-gray-300">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile edit button */}
      <div className="md:hidden container mx-auto px-4 py-4">
        <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-500/10">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="info" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
            <TabsTrigger value="info">
              <User className="h-4 w-4 mr-2" />
              {t("profile.user.info")}
            </TabsTrigger>
            <TabsTrigger value="listings">
              <FileText className="h-4 w-4 mr-2" />
              {t("profile.user.listings")}
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              {t("profile.user.saved")}
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Clock className="h-4 w-4 mr-2" />
              {t("profile.user.activity")}
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="h-4 w-4 mr-2" />
              {t("profile.user.reviews")}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              {t("profile.user.settings")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.user.info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Bio</h3>
                  <p className="text-muted-foreground">{userData.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                        <span>Member since: {userData.memberSince}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-pink-500 mr-2" />
                        <span>Active listings: {userData.listings.length}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-pink-500 mr-2" />
                        <span>Reviews written: {userData.reviews.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{t("profile.user.listings")}</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">Create New Listing</Button>
            </div>

            {userData.listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.listings.map((listing) => (
                  <Card
                    key={listing.id}
                    className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
                  >
                    <div className="relative">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
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
                      <div className="font-medium text-pink-500 mb-2">{listing.price}</div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>Views: {listing.views}</div>
                        <div>Inquiries: {listing.inquiries}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any active listings yet.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Create Your First Listing</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">{t("profile.user.saved")}</h2>

            {userData.savedListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.savedListings.map((listing) => (
                  <Card
                    key={listing.id}
                    className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
                  >
                    <div className="relative">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
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
                      <div className="font-medium text-pink-500 mb-2">{listing.price}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {listing.business.name}
                          {listing.business.verified && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {t("common.verified")}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">Saved {listing.savedAt}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">You haven't saved any listings yet.</p>
                  <Button className="bg-pink-600 hover:bg-pink-700">Browse Listings</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.user.activity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div
                        className={`p-2 rounded-full mr-4 ${
                          activity.type === "view"
                            ? "bg-blue-500/10 text-blue-500"
                            : activity.type === "save"
                              ? "bg-pink-500/10 text-pink-500"
                              : activity.type === "message"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.user.reviews")}</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {userData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.business.avatar} alt={review.business.name} />
                            <AvatarFallback>{review.business.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.business.name}</h4>
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
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">You haven't written any reviews yet.</p>
                    <Button className="bg-pink-600 hover:bg-pink-700">Browse Businesses</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.user.settings")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your profile settings, notifications, and account preferences.
                </p>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

