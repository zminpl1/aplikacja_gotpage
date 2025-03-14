"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import UserProfilePage from "@/components/profiles/user-profile"
import BusinessProfilePage from "@/components/profiles/business-profile"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"

// Mock data service
import { getUserById, getBusinessById } from "@/lib/data-service"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const type = params.type as string
  const id = params.id as string

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (type === "user") {
          const userData = await getUserById(Number.parseInt(id))
          setData(userData)
        } else if (type === "business") {
          const businessData = await getBusinessById(Number.parseInt(id))
          setData(businessData)
        } else {
          setError("Invalid profile type")
          router.push("/404")
        }
      } catch (err) {
        setError("Failed to load profile")
        console.error(err)
      } finally {
        // Simulate network delay
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchData()
  }, [type, id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-900 to-black">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="container mx-auto px-4">
              <div className="flex items-end">
                <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-lg mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t("common.error")}</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
          >
            {t("common.backToHome")}
          </button>
        </div>
      </div>
    )
  }

  if (type === "user" && data) {
    return <UserProfilePage userData={data} />
  }

  if (type === "business" && data) {
    return <BusinessProfilePage businessData={data} />
  }

  return null
}

