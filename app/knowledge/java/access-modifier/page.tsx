import { getMarkdownContent } from "@/lib/markdown";

export default async function AccessModifierPage() {
    const { meta, contentHtml } = await getMarkdownContent(
        "contents/knowledge/java/access-modifier.md"
    );

    return (
        <main style={{ padding: "2rem" }}>
            <h1>{meta.title}</h1>
            <p>{meta.date?.toISOString().split('T')[0]}</p>

            <article
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </main>
    );
}
