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
        <div>
            <h1>{category}</h1>

            <ul>
                {posts.map((post) => (
                    <li key={post.slug.join("/")}>
                        <Link href={`/knowledge/${post.slug.join("/")}`}>
                            {post.title}
                        </Link>
                        {post.date && <span> ({post.date})</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
