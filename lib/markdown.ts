import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";

const CONTENT_ROOT = path.join(process.cwd(), "contents/knowledge");

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

export type TOCItem = {
    level: string;
    title: string;
    id: string;
};

export async function getMarkdownContent(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const headings: TOCItem[] = [];

    // Custom plugin to extract headings
    function rehypeExtractHeadings() {
        return (tree: any) => {
            visit(tree, "element", (node: any) => {
                if (["h2", "h3"].includes(node.tagName) && node.properties.id) {
                    const title = node.children
                        .map((child: any) => (child.type === "text" ? child.value : ""))
                        .join("");

                    headings.push({
                        level: node.tagName,
                        title,
                        id: node.properties.id,
                    });
                }
            });
        };
    }

    const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug) // Generate IDs for headings
        .use(rehypeCodeTitles) // Apply custom titles
        .use(rehypeHighlight) // Apply syntax highlighting
        .use(rehypeExtractHeadings) // Extract headings
        .use(rehypeStringify)
        .process(content);

    return {
        meta: data as { title: string; date?: string; tags?: string[];[key: string]: any },
        contentHtml: processedContent.toString(),
        toc: headings,
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
    tags?: string[];
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
            tags: data.tags,
            meta: data,
        };
    });
}

// Function to get Previous and Next posts
export function getPrevNextPosts(currentSlug: string[]) {
    const allPosts = getAllMarkdownMeta();

    // Sort posts by date (descending) or alphabetically if you prefer
    // For now, let's just use the order they are returned (filesystem order might vary, so sorting is better)
    // Let's sort simply by title for a deterministic order if date is missing
    allPosts.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
    });

    const currentIndex = allPosts.findIndex(
        (post) => JSON.stringify(post.slug) === JSON.stringify(currentSlug)
    );

    if (currentIndex === -1) {
        return { prev: null, next: null };
    }

    const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prev, next };
}

// Function to get Related Posts based on tags
export function getRelatedPosts(currentSlug: string[], tags: string[] = []) {
    if (!tags || tags.length === 0) return [];

    const allPosts = getAllMarkdownMeta();

    const related = allPosts
        .filter((post) => {
            // Exclude current post
            if (JSON.stringify(post.slug) === JSON.stringify(currentSlug)) return false;

            // Check for intersecting tags
            const otherTags = post.tags || [];
            return tags.some((tag) => otherTags.includes(tag));
        })
        .map((post) => {
            // Calculate relevance score (number of matching tags)
            const otherTags = post.tags || [];
            const score = tags.filter((tag) => otherTags.includes(tag)).length;
            return { ...post, score };
        })
        .sort((a, b) => b.score - a.score) // Sort by relevance
        .slice(0, 3); // Return top 3

    return related;
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

