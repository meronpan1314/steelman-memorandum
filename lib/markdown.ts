import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
// import html from "remark-html"; // Removed
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";

const CONTENT_ROOT = path.join(process.cwd(), "contents/knowledge");

// Custom plugin to add titles to code blocks
function rehypeCodeTitles() {
    return (tree: any) => {
        visit(tree, "element", (node: any, index, parent: any) => {
            if (node.tagName === "pre" && node.children && node.children.length > 0) {
                const codeNode = node.children[0];
                if (codeNode.tagName === "code" && codeNode.properties && codeNode.properties.className) {
                    const className = codeNode.properties.className;
                    const languageClass = className.find((c: string) => c.startsWith("language-"));

                    if (languageClass && parent && typeof index === "number") {
                        const language = languageClass.replace("language-", "");
                        const title = language.charAt(0).toUpperCase() + language.slice(1);

                        const titleNode = {
                            type: "element",
                            tagName: "div",
                            properties: { className: ["code-block-title"] },
                            children: [{ type: "text", value: title }],
                        };

                        const containerNode = {
                            type: "element",
                            tagName: "div",
                            properties: { className: ["code-block-container"] },
                            children: [titleNode, node],
                        };

                        parent.children[index] = containerNode;
                    }
                }
            }
        });
    };
}

export async function getMarkdownContent(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);
    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeCodeTitles) // Apply custom titles
        .use(rehypeHighlight) // Apply syntax highlighting
        .use(rehypeStringify)
        .process(content);

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

export type DirectoryNode = {
    name: string;
    title: string;
    type: "file" | "directory";
    path: string;
    children?: DirectoryNode[];
};

export function getDirectoryTree(
    dir: string = CONTENT_ROOT,
    basePath: string = "/knowledge"
): DirectoryNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Sort entries: directories first, then files. 
    // Within each group, sort alphabetically.
    entries.sort((a, b) => {
        if (a.isDirectory() && b.isFile()) return -1;
        if (a.isFile() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    return entries
        .map((entry) => {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.join(basePath, entry.name).replace(".md", "");

            if (entry.isDirectory()) {
                return {
                    name: entry.name,
                    title: entry.name, // Directories use their name as title for now
                    type: "directory",
                    path: relativePath,
                    children: getDirectoryTree(fullPath, relativePath),
                } as DirectoryNode;
            }

            if (entry.isFile() && entry.name.endsWith(".md")) {
                // Optimized: Use filename as title since files are renamed to titles
                const title = entry.name.replace(".md", "");

                return {
                    name: title,
                    title: title,
                    type: "file",
                    path: relativePath,
                } as DirectoryNode;
            }

            return null;
        })
        .filter((node): node is DirectoryNode => node !== null);
}

