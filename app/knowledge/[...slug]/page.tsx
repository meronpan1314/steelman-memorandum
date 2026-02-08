import { getMarkdownContent } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import remarkGfm from "remark-gfm";

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export default async function KnowledgePage({ params }: Props) {
    try {
        const { slug } = await params;
        const filePath = `contents/knowledge/${slug.join("/")}.md`;
        const { meta, contentHtml } = await getMarkdownContent(filePath);
        const date = String(meta.date);

        return (
            <main style={{ padding: "2rem" }}>
                <Breadcrumb slug={slug} />
                <h1>{meta.title}</h1>
                <p>{date}</p>

                <article
                    className="markdown"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </main>
        );
    } catch {
        notFound();
    }
}
