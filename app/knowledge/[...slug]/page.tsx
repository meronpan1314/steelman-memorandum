import { getMarkdownContent } from "@/lib/markdown";
import { notFound } from "next/navigation";

type Props = {
    params: {
        slug: string[];
    };
};

export default async function KnowledgePage({ params }: Props) {
    try {
        const filePath = `contents/knowledge/${params.slug.join("/")}.md`;
        const { meta, contentHtml } = await getMarkdownContent(filePath);

        return (
            <main style={{ padding: "2rem" }}>
                <h1>{meta.title}</h1>
                <p>{meta.date}</p>

                <article
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </main>
        );
    } catch {
        notFound();
    }
}
