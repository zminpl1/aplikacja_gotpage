"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import Link from "next/link"
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
import { useLanguage } from "@/contexts/language-context"

export default function BusinessProfilePage({ businessData }: { businessData: any }) {
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
                  <span className="text-sm">
                    ({businessData.reviews} {t("common.reviews")})
                  </span>
                </div>
              </div>
              <div className="hidden md:flex space-x-2">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("common.contact")}
                </Button>
                <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
                  <Edit className="h-4 w-4 mr-2" />
                  {t("profile.edit")}
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
          {t("common.contact")}
        </Button>
        <Button variant="outline" className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-500/10">
          <Edit className="h-4 w-4 mr-2" />
          {t("profile.edit")}
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
                  <h3 className="text-lg font-medium mb-2">{t("profile.about")}</h3>
                  <p className="text-muted-foreground">{businessData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">{t("profile.contactInfo")}</h3>
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
                      {businessData.nip && (
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-pink-500 mr-2" />
                          <span>NIP: {businessData.nip}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">{t("profile.businessHours")}</h3>
                    <div className="space-y-2">
                      {businessData.workingHours.map((item: any, index: number) => (
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
                    <h3 className="text-lg font-medium mb-3">{t("profile.businessDetails")}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                        <span className="text-muted-foreground">
                          {t("profile.founded")}: {businessData.founded}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-pink-500 mr-2" />
                        <span className="text-muted-foreground">
                          {t("profile.employees")}: {businessData.employees}
                        </span>
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
              <Link href="/listings/create">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("listings.addNew")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessData.listings.map((listing: any) => (
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
                      <div>
                        {t("listings.views")}: {listing.views}
                      </div>
                      <div>
                        {t("listings.inquiries")}: {listing.inquiries}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Link href={`/listings/${listing.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        {t("common.view")}
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-pink-500 border-pink-500 hover:bg-pink-500/10">
                      {t("common.edit")}
                    </Button>
                    <Button variant="outline" size="sm" className="text-pink-500 border-pink-500 hover:bg-pink-500/10">
                      {t("common.promote")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs content remains the same but with translations */}
          {/* ... */}
        </Tabs>
      </div>
    </div>
  )
}

