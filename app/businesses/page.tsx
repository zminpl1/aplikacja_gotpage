

export const dynamic = "force-dynamic"

export default function BusinessPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Strona w trakcie aktualizacji</h1>
      <p>Ta sekcja jest obecnie aktualizowana i będzie dostępna wkrótce.</p>
    </div>
  )
}



/*import { Search, Filter, MapPin, Star, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: "Prime Properties",
    description: "Leading real estate agency specializing in premium commercial and residential properties.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Real Estate",
    location: "Downtown Business District",
    rating: 4.8,
    reviews: 124,
    verified: true,
    featured: true,
    listingsCount: 45,
  },
  {
    id: 2,
    name: "Digital Creatives",
    description: "Full-service digital agency offering web design, development, and digital marketing solutions.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    location: "Tech Hub",
    rating: 4.9,
    reviews: 89,
    verified: true,
    featured: true,
    listingsCount: 12,
  },
  {
    id: 3,
    name: "Retro Furnishings",
    description: "Curated collection of authentic vintage and mid-century modern furniture and home decor.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Retail",
    location: "Arts District",
    rating: 4.7,
    reviews: 56,
    verified: false,
    featured: false,
    listingsCount: 28,
  },
  {
    id: 4,
    name: "Growth Strategies",
    description: "Strategic marketing consultancy helping businesses achieve sustainable growth and increased ROI.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    location: "Financial District",
    rating: 5.0,
    reviews: 42,
    verified: true,
    featured: true,
    listingsCount: 5,
  },
  {
    id: 5,
    name: "DesignWorks Studio",
    description: "Creative design studio specializing in branding, graphic design, and visual identity systems.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Creative",
    location: "Creative District",
    rating: 4.6,
    reviews: 37,
    verified: true,
    featured: false,
    listingsCount: 8,
  },
  {
    id: 6,
    name: "WorkSpace Collective",
    description: "Modern coworking spaces with flexible membership options and premium amenities.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Real Estate",
    location: "Innovation Hub",
    rating: 4.8,
    reviews: 64,
    verified: true,
    featured: false,
    listingsCount: 3,
  },
  {
    id: 7,
    name: "Leather & Co.",
    description: "Artisanal leather workshop creating handcrafted leather goods using traditional techniques.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Retail",
    location: "Artisan Quarter",
    rating: 4.9,
    reviews: 28,
    verified: false,
    featured: false,
    listingsCount: 15,
  },
  {
    id: 8,
    name: "Social Boost",
    description: "Social media management agency specializing in growth strategies and engagement optimization.",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    location: "Digital District",
    rating: 4.7,
    reviews: 51,
    verified: true,
    featured: false,
    listingsCount: 6,
  },
]

export default function BusinessesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Business Directory</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search businesses..."
                className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-pink-500/30 focus:border-pink-500"
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-12 bg-background/80 backdrop-blur-sm border-pink-500/30 focus:border-pink-500">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-12 bg-background/80 backdrop-blur-sm border-pink-500/30 focus:border-pink-500">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="tech-hub">Tech Hub</SelectItem>
                  <SelectItem value="creative">Creative District</SelectItem>
                  <SelectItem value="financial">Financial District</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 bg-pink-600 hover:bg-pink-700 text-white">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Businesses</h2>
            <p className="text-muted-foreground">Showing {businesses.length} results</p>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="rating">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="listings">Most Listings</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Card
              key={business.id}
              className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
            >
              <div className="relative h-40">
                {business.featured && (
                  <Badge className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700">Featured</Badge>
                )}
                <img
                  src={business.coverImage || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 left-4">
                  <img
                    src={business.logo || "/placeholder.svg"}
                    alt={`${business.name} logo`}
                    className="w-16 h-16 rounded-full border-4 border-background"
                  />
                </div>
              </div>
              <CardContent className="p-4 pt-8">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      {business.verified && <CheckCircle className="h-4 w-4 ml-1 text-pink-500" />}
                    </div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="flex items-center bg-secondary/50 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">
                      {business.rating} ({business.reviews})
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{business.description}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                  {business.location}
                </div>
                <div className="text-sm text-muted-foreground">{business.listingsCount} active listings</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Link
                  href={`/businesses/${business.id}`}
                  className="text-pink-500 hover:text-pink-600 flex items-center"
                >
                  View Business <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" className="bg-pink-600 text-white hover:bg-pink-700">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
*/
