import { Search, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Premium Office Space",
    description: "Modern office space with all amenities in the heart of downtown.",
    image: "/placeholder.svg?height=200&width=300",
    price: "$1,200/month",
    location: "Downtown Business District",
    category: "Real Estate",
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
    price: "Starting at $999",
    location: "Remote / Nationwide",
    category: "Services",
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
    price: "Various prices",
    location: "Arts District",
    category: "Retail",
    featured: false,
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
    price: "$150/hour",
    location: "Tech Hub",
    category: "Services",
    featured: true,
    business: {
      name: "Growth Strategies",
      verified: true,
    },
  },
  {
    id: 5,
    title: "Graphic Design Services",
    description: "Professional graphic design services for branding, marketing materials, and digital assets.",
    image: "/placeholder.svg?height=200&width=300",
    price: "$75/hour",
    location: "Creative District",
    category: "Services",
    featured: false,
    business: {
      name: "DesignWorks Studio",
      verified: true,
    },
  },
  {
    id: 6,
    title: "Coworking Desk Space",
    description: "Flexible desk space in a modern coworking environment with high-speed internet and amenities.",
    image: "/placeholder.svg?height=200&width=300",
    price: "$25/day",
    location: "Innovation Hub",
    category: "Real Estate",
    featured: false,
    business: {
      name: "WorkSpace Collective",
      verified: true,
    },
  },
  {
    id: 7,
    title: "Handcrafted Leather Goods",
    description: "Artisanal leather wallets, bags, and accessories handmade with premium materials.",
    image: "/placeholder.svg?height=200&width=300",
    price: "Various prices",
    location: "Artisan Quarter",
    category: "Retail",
    featured: false,
    business: {
      name: "Leather & Co.",
      verified: false,
    },
  },
  {
    id: 8,
    title: "Social Media Management",
    description: "Comprehensive social media management services to grow your online presence and engagement.",
    image: "/placeholder.svg?height=200&width=300",
    price: "$500/month",
    location: "Digital District",
    category: "Marketing",
    featured: false,
    business: {
      name: "Social Boost",
      verified: true,
    },
  },
]

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Browse Listings</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search listings..."
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
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
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
                  <SelectItem value="remote">Remote</SelectItem>
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
            <h2 className="text-2xl font-bold text-foreground">All Listings</h2>
            <p className="text-muted-foreground">Showing {listings.length} results</p>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 border-border/50"
            >
              <div className="relative">
                {listing.featured && (
                  <Badge className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700">Featured</Badge>
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
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                  {listing.location}
                </div>
                <div className="font-medium text-pink-500">{listing.price}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="text-sm">
                  {listing.business.name}
                  {listing.business.verified && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <Link href={`/listings/${listing.id}`} className="text-pink-500 hover:text-pink-600">
                  View Details
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

