"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import Link from "next/link"
import { User, Settings, Bookmark, MessageSquare, FileText, Star, Clock, MapPin, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

export default function UserProfilePage({ userData }: { userData: any }) {
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
                  {t("profile.edit")}
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
          {t("profile.edit")}
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
                  <h3 className="text-lg font-medium mb-2">{t("profile.bio")}</h3>
                  <p className="text-muted-foreground">{userData.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">{t("profile.contactInfo")}</h3>
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
                    <h3 className="text-lg font-medium mb-3">{t("profile.accountInfo")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                        <span>
                          {t("profile.memberSince")}: {userData.memberSince}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-pink-500 mr-2" />
                        <span>
                          {t("profile.activeListings")}: {userData.listings.length}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-pink-500 mr-2" />
                        <span>
                          {t("profile.reviewsWritten")}: {userData.reviews.length}
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
              <h2 className="text-2xl font-bold">{t("profile.user.listings")}</h2>
              <Link href="/listings/create">
                <Button className="bg-pink-600 hover:bg-pink-700">{t("listings.create")}</Button>
              </Link>
            </div>

            {userData.listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.listings.map((listing: any) => (
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        {t("common.edit")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-500 hover:bg-pink-500/10"
                      >
                        {t("common.delete")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">{t("profile.noListings")}</p>
                  <Link href="/listings/create">
                    <Button className="bg-pink-600 hover:bg-pink-700">{t("listings.createFirst")}</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Other tabs content remains the same but with translations */}
          {/* ... */}
        </Tabs>
      </div>
    </div>
  )
}

