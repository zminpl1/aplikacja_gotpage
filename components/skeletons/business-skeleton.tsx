import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BusinessSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-border/50">
      <div className="relative h-40">
        <Skeleton className="w-full h-full" />
        <div className="absolute -bottom-6 left-4">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>
      <CardContent className="p-4 pt-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-4 rounded-full ml-1" />
            </div>
            <Skeleton className="h-5 w-20 mt-1 rounded-full" />
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full mt-3" />
        <Skeleton className="h-4 w-full mt-2" />
        <div className="flex items-center mt-4">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-1/3 mt-3" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Skeleton className="h-4 w-28" />
      </CardFooter>
    </Card>
  )
}

