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
            date: data.date?.toISOString().split('T')[0] ?? "",
            slug,
        };
    });

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Knowledge</h1>

            <ul>
                {articles.map((article) => (
                    <li key={article.slug.join("/")}>
                        <Link href={`/knowledge/${article.slug.join("/")}`}>
                            {article.title}
                        </Link>
                        {article.date && <span>（{article.date}）</span>}
                    </li>
                ))}
            </ul>
        </main>
    );
}
