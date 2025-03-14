import BusinessSkeleton from "@/components/skeletons/business-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-[180px]" />
              <Skeleton className="h-12 w-[180px]" />
              <Skeleton className="h-12 w-[100px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <BusinessSkeleton key={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

