import Link from "next/link";
import { BlogPost } from "@lib/notion";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blog/${post.slug}`} prefetch={true}>
      <article
        className={`group cursor-pointer h-full bg-surface rounded-xl p-6 
          transition-all duration-300 hover:shadow-lg hover:-translate-y-1
          border border-border hover:border-primary/30
          ${featured ? "ring-2 ring-primary/20" : ""}`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              추천
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-bold text-text-primary group-hover:text-primary transition-colors truncate mb-2
            ${featured ? "text-lg" : "text-base"}`}
        >
          {post.title}
        </h3>

        {/* Summary (카테고리 컨테이너 hover 시 전체 카드 동시 표시) */}
        {post.summary && (
          <div
            className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover/zone:max-h-24 group-hover/zone:opacity-100 mb-0 group-hover/zone:mb-4"
          >
            <p className="text-text-secondary text-sm line-clamp-3">
              {post.summary}
            </p>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-text-secondary">
                +{post.tags.length - 3}개
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <time className="text-xs text-text-secondary">
            {formatDate(post.publishedDate)}
          </time>
          <span className="text-xs text-primary group-hover:text-primary/80 transition-colors">
            읽어보기 →
          </span>
        </div>
      </article>
    </Link>
  );
} 