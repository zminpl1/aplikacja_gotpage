"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  Edit,
  Plus,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

// Mock business data
const businessData = {
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
  reviews: [
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
}

export default function BusinessProfilePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-900 to-black">
        <img
          src={businessData.coverImage || "/placeholder.svg"}
          alt={`${businessData.name} cover`}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex items-end">
              <div className="mr-4">
                <img
                  src={businessData.logo || "/placeholder.svg"}
                  alt={`${businessData.name} logo`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-background"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mr-2">{businessData.name}</h1>
                  {businessData.verified && <CheckCircle className="h-5 w-5 text-pink-500" />}
                </div>
                <div className="flex items-center mt-1">
                  <Badge className="mr-2 bg-pink-600">{businessData.category}</Badge>
                  <Badge variant="outline">{businessData.subcategory}</Badge>
                </div>
                <div className="flex items-center mt-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="mr-1">{businessData.rating}</span>
                  <span className="text-sm">({businessData.reviews} reviews)</span>
                </div>
              </div>
              <div className="hidden md:flex space-x-2">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="md:hidden container mx-auto px-4 py-4 flex space-x-2">
        <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact
        </Button>
        <Button variant="outline" className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-500/10">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="info" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
            <TabsTrigger value="info">
              <Building className="h-4 w-4 mr-2" />
              {t("profile.business.info")}
            </TabsTrigger>
            <TabsTrigger value="listings">
              <Plus className="h-4 w-4 mr-2" />
              {t("profile.business.listings")}
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="h-4 w-4 mr-2" />
              {t("profile.business.reviews")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t("profile.business.analytics")}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              {t("profile.business.settings")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.business.info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{businessData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                        <span>{businessData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{businessData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{businessData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-pink-500 mr-2" />
                        <span>{businessData.website}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Business Hours</h3>
                    <div className="space-y-2">
                      {businessData.workingHours.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <Clock className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                          <div>
                            <div className="font-medium">{item.day}</div>
                            <div className="text-muted-foreground">{item.hours}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Business Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                        <span className="text-muted-foreground">Founded: {businessData.founded}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-pink-500 mr-2" />
                        <span className="text-muted-foreground">Employees: {businessData.employees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{t("profile.business.listings")}</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessData.listings.map((listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
                >
                  <div className="relative">
                    {listing.featured && (
                      <Badge className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700">
                        {t("common.featured")}
                      </Badge>
                    )}
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
                    <div className="font-medium text-pink-500 mb-2">{listing.price}</div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>Views: {listing.views}</div>
                      <div>Inquiries: {listing.inquiries}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="text-pink-500 border-pink-500 hover:bg-pink-500/10">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-pink-500 border-pink-500 hover:bg-pink-500/10">
                      Promote
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.business.reviews")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="text-4xl font-bold mr-4">{businessData.rating}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(businessData.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-muted-foreground">Based on {businessData.reviews} reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {businessData.reviews.map((review) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{businessData.viewsThisMonth}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{businessData.contactsThisMonth}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{businessData.listingsCount}</div>
                  <p className="text-xs text-muted-foreground">Total</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Detailed analytics charts will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.business.settings")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your business profile settings, notifications, and account preferences.
                </p>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Business Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    Deactivate Business Account
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

