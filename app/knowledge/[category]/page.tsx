import Link from "next/link";
import { getMarkdownByCategory } from "@/lib/markdown";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    const posts = getMarkdownByCategory(category);

    return (
        <div className="max-w-4xl mx-auto py-8 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 border-l-4 border-emerald-500 pl-4">{category}</h1>

            <ul className="grid gap-4">
                {posts.map((post) => (
                    <li key={post.slug.join("/")} className="group">
                        <Link
                            href={`/knowledge/${post.slug.join("/")}`}
                            className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wide">
                                    Post
                                </span>
                                {post.date && <span className="text-gray-400 text-xs font-mono">{post.date}</span>}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                {post.title}
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
