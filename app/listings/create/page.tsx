"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Image } from "lucide-react"

// Mock categories data
const categories = [
  { id: "real-estate", name: "category.realestate" },
  { id: "retail", name: "category.retail" },
  { id: "food", name: "category.food" },
  { id: "automotive", name: "category.automotive" },
  { id: "services", name: "category.services" },
  { id: "beauty", name: "category.beauty" },
  { id: "technology", name: "category.technology" },
  { id: "corporate", name: "category.corporate" },
  { id: "accommodation", name: "category.accommodation" },
  { id: "transport", name: "category.transport" },
  { id: "education", name: "category.education" },
  { id: "entertainment", name: "category.entertainment" },
]

export default function CreateListingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !description || !category || !price || !location) {
      toast({
        title: t("common.error"),
        description: t("listings.requiredFields"),
        variant: "destructive",
      })
      return
    }

    if (!termsAccepted) {
      toast({
        title: t("common.error"),
        description: t("listings.acceptTerms"),
        variant: "destructive",
      })
      return
    }

    // Simulate listing creation
    toast({
      title: t("common.success"),
      description: t("listings.createSuccess"),
    })

    // Redirect to listings page
    setTimeout(() => {
      router.push("/listings")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t("listings.createNew")}</h1>

          <Card>
            <CardHeader>
              <CardTitle>{t("listings.listingDetails")}</CardTitle>
              <CardDescription>{t("listings.createDescription")}</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("listings.basicInfo")}</h3>

                  <div className="space-y-2">
                    <Label htmlFor="title">{t("listings.title")} *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={t("listings.titlePlaceholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t("listings.description")} *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("listings.descriptionPlaceholder")}
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">{t("listings.category")} *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("listings.selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {t(cat.name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">{t("listings.price")} *</Label>
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="np. 1500 zł/miesiąc"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t("listings.location")} *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t("listings.locationPlaceholder")}
                      required
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("listings.images")}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border border-border"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Listing image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <label className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed border-border bg-muted/50 hover:bg-muted cursor-pointer">
                      <div className="flex flex-col items-center justify-center p-4">
                        <Image className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">{t("listings.uploadImages")}</p>
                      </div>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>

                  <p className="text-sm text-muted-foreground">{t("listings.imagesDescription")}</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("listings.contactInfo")}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">{t("listings.contactEmail")}</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">{t("listings.contactPhone")}</Label>
                      <Input
                        id="contactPhone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{t("listings.contactDescription")}</p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("listings.options")}</h3>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={featured}
                      onCheckedChange={(checked) => setFeatured(checked as boolean)}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("listings.markAsFeatured")}
                    </label>
                  </div>

                  <p className="text-sm text-muted-foreground">{t("listings.featuredDescription")}</p>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("listings.termsText")}{" "}
                    <a href="/terms" className="text-pink-500 hover:text-pink-600">
                      {t("listings.termsLink")}
                    </a>
                  </label>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                  <Upload className="h-4 w-4 mr-2" />
                  {t("listings.publishListing")}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

