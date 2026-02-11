import Link from "next/link";
import matter from "gray-matter";
import fs from "fs";
import { getAllMarkdownPaths } from "@/lib/markdown";

export default function KnowledgeIndexPage() {
    const files = getAllMarkdownPaths();

    const articles = files.map(({ slug, filePath }) => {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
            title: data.title ?? slug[slug.length - 1],
            date: data.date,
            slug,
        };
    });

    const groupedArticles = articles.reduce((acc, article) => {
        const category = article.slug[0];

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push(article);
        return acc;
    }, {} as Record<string, typeof articles>);

    return (
        <main className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 border-l-4 border-emerald-500 pl-4">
                Knowledge
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(groupedArticles).map(([category, items]) => (
                    <section key={category} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
                            <Link href={`/knowledge/${category}`} className="hover:text-emerald-600 transition-colors">
                                {category}
                            </Link>
                        </h2>

                        <ul className="space-y-3">
                            {items.slice(0, 5).map((article) => (
                                <li key={article.slug.join("/")} className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 pb-2">
                                    <Link
                                        href={`/knowledge/${article.slug.join("/")}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-full"
                                    >
                                        {article.title}
                                    </Link>
                                </li>
                            ))}
                            {items.length > 5 && (
                                <li className="pt-2">
                                    <Link href={`/knowledge/${category}`} className="text-sm text-emerald-600 hover:underline font-medium">
                                        View all {items.length} posts →
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}
