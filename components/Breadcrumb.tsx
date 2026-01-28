import Link from "next/link";

type Props = {
    slug: string[];
};

export default function Breadcrumb({ slug }: Props) {
    const paths = slug.map((_, index) => ({
        name: slug[index],
        href: "/knowledge/" + slug.slice(0, index + 1).join("/"),
    }));

    return (
        <nav style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
            <Link href="/knowledge">Knowledge</Link>
            {paths.map((p) => (
                <span key={p.href}>
                    {" / "}
                    <Link href={p.href}>{p.name}</Link>
                </span>
            ))}
        </nav>
    );
}
