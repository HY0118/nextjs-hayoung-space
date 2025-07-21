export default function BlogSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-full bg-surface rounded-xl p-6 border border-border animate-pulse"
        >
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          
          {/* Summary Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          
          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
            <div className="h-6 w-14 bg-gray-200 rounded-md"></div>
          </div>
          
          {/* Date Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 