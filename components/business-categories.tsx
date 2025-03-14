"use client"

import Link from "next/link"
import {
  Building2,
  ShoppingBag,
  Utensils,
  Car,
  Briefcase,
  Home,
  Scissors,
  Laptop,
  Bed,
  Bus,
  GraduationCap,
  Music,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock data for business categories
const categories = [
  {
    id: 1,
    name: "category.realestate",
    icon: <Home className="h-6 w-6" />,
    count: 245,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 2,
    name: "category.retail",
    icon: <ShoppingBag className="h-6 w-6" />,
    count: 189,
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: 3,
    name: "category.food",
    icon: <Utensils className="h-6 w-6" />,
    count: 312,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    id: 4,
    name: "category.automotive",
    icon: <Car className="h-6 w-6" />,
    count: 98,
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: 5,
    name: "category.services",
    icon: <Briefcase className="h-6 w-6" />,
    count: 276,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: 6,
    name: "category.beauty",
    icon: <Scissors className="h-6 w-6" />,
    count: 154,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    id: 7,
    name: "category.technology",
    icon: <Laptop className="h-6 w-6" />,
    count: 203,
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    id: 8,
    name: "category.corporate",
    icon: <Building2 className="h-6 w-6" />,
    count: 167,
    color: "bg-gray-500/10 text-gray-500",
  },
  {
    id: 9,
    name: "category.accommodation",
    icon: <Bed className="h-6 w-6" />,
    count: 132,
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    id: 10,
    name: "category.transport",
    icon: <Bus className="h-6 w-6" />,
    count: 87,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    id: 11,
    name: "category.education",
    icon: <GraduationCap className="h-6 w-6" />,
    count: 112,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    id: 12,
    name: "category.entertainment",
    icon: <Music className="h-6 w-6" />,
    count: 195,
    color: "bg-violet-500/10 text-violet-500",
  },
]

export default function BusinessCategories() {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`} className="group">
          <div className="flex flex-col items-center p-6 rounded-lg border border-border/50 bg-card hover:border-pink-500/50 hover:shadow-md transition-all duration-300">
            <div className={`p-3 rounded-full mb-4 ${category.color}`}>{category.icon}</div>
            <h3 className="font-medium text-foreground group-hover:text-pink-500 transition-colors text-center">
              {t(category.name)}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {category.count} {t("category.listings")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

