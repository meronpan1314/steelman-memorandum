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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">{category}</h1>

            <ul className="space-y-3 pl-4">
                {posts.map((post) => (
                    <li key={post.slug.join("/")} className="list-disc marker:text-gray-400">
                        <Link
                            href={`/knowledge/${post.slug.join("/")}`}
                            className="text-lg text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                            {post.title}
                        </Link>
                        {post.date && <span className="text-gray-500 text-sm ml-3">({post.date})</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
