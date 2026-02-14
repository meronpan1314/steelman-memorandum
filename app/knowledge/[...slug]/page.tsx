import { getMarkdownContent, getPrevNextPosts, getRelatedPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TableOfContents from "@/components/TableOfContents";
import ArticleNavigation from "@/components/ArticleNavigation";
import RelatedArticles from "@/components/RelatedArticles";

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export default async function KnowledgePage({ params }: Props) {
    try {
        const { slug } = await params;
        const decodedSlug = slug.map(s => decodeURIComponent(s));
        const filePath = `contents/knowledge/${decodedSlug.join("/")}.md`;
        const { meta, contentHtml, toc } = await getMarkdownContent(filePath);
        const date = String(meta.date);

        const { prev, next } = getPrevNextPosts(decodedSlug);
        const relatedPosts = getRelatedPosts(decodedSlug, meta.tags);

        return (
            <main style={{ padding: "2rem" }} className="max-w-7xl mx-auto">
                <Breadcrumb slug={decodedSlug} />

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 min-w-0">
                        <h1 className="md_title">{meta.title}</h1>
                        <div className="mt-2 mb-6 flex flex-wrap gap-4 items-center text-sm text-gray-500 dark:text-gray-400">
                            {date && <span>{date}</span>}
                            {meta.tags && meta.tags.length > 0 && (
                                <div className="flex gap-2">
                                    {meta.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <article
                            className="markdown"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        <ArticleNavigation prev={prev} next={next} />
                        <RelatedArticles posts={relatedPosts} />
                    </div>

                    <div className="hidden lg:block w-72 shrink-0">
                        <TableOfContents toc={toc} />
                    </div>
                </div>
            </main>
        );
    } catch {
        notFound();
    }
}
