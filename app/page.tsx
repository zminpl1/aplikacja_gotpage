"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedListings from "@/components/featured-listings"
import BusinessCategories from "@/components/business-categories"
import RecentListings from "@/components/recent-listings"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="text-pink-500">{t("home.hero.title")}</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">{t("home.hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={t("home.hero.search")}
                className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-pink-500/30 focus:border-pink-500"
              />
            </div>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
              {t("home.hero.button")}
            </Button>
          </div>
        </div>
      </section>

      {/* Business Categories */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">{t("home.categories.title")}</h2>
          <BusinessCategories />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-black/50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">{t("home.featured.title")}</h2>
            <Link href="/listings" className="text-pink-500 hover:text-pink-400">
              {t("home.viewall")}
            </Link>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">{t("home.recent.title")}</h2>
            <Link href="/listings" className="text-pink-500 hover:text-pink-400">
              {t("home.viewall")}
            </Link>
          </div>
          <RecentListings />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-900/20 to-pink-600/20">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("home.cta.title")}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">{t("home.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
              {t("home.cta.user")}
            </Button>
            <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
              {t("home.cta.business")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

