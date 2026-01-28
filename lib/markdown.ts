import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_ROOT = path.join(process.cwd(), "contents/knowledge");

export async function getMarkdownContent(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);

    return {
        meta: data,
        contentHtml: processedContent.toString(),
    };
}

export function getAllMarkdownPaths(
    dir: string = CONTENT_ROOT,
    basePath: string[] = []
): { slug: string[]; filePath: string }[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    let results: { slug: string[]; filePath: string }[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            results = results.concat(
                getAllMarkdownPaths(fullPath, [...basePath, entry.name])
            );
        }

        if (entry.isFile() && entry.name.endsWith(".md")) {
            const slug = [...basePath, entry.name.replace(".md", "")];
            results.push({
                slug,
                filePath: fullPath,
            });
        }
    }

    return results;
}

export function getMarkdownByCategory(category: string) {
    return getAllMarkdownMeta().filter(
        (post) => post.slug[0] === category
    );
}


export type MarkdownMeta = {
    slug: string[];
    title: string;
    date?: string;
    meta: { [key: string]: any };
};

export function getAllMarkdownMeta(): MarkdownMeta[] {
    const paths = getAllMarkdownPaths();

    return paths.map(({ slug, filePath }) => {
        const file = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(file);

        return {
            slug,
            title: data.title ?? slug.at(-1),
            date: data.date,
            meta: data,
        };
    });
}

