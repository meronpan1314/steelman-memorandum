import Link from "next/link";
import { MarkdownMeta } from "@/lib/markdown";

type Props = {
    posts: (MarkdownMeta & { score?: number })[];
};

export default function RelatedArticles({ posts }: Props) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <Link
                        key={post.slug.join("/")}
                        href={`/knowledge/${post.slug.join("/")}`}
                        className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                    >
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {post.title}
                        </h4>
                        {post.date && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {post.date}
                            </p>
                        )}
                        {post.tags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {post.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
