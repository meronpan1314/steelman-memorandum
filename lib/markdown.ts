import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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

const CONTENT_ROOT = path.join(process.cwd(), "contents/knowledge");

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
