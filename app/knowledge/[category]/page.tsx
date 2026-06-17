import { getDirectoryNodeBySlug } from "@/lib/markdown";
import DirectoryListing from "@/components/DirectoryListing";
import { notFound } from "next/navigation";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    const directory = getDirectoryNodeBySlug([category]);

    if (!directory) {
        notFound();
    }

    return <DirectoryListing node={directory} />;
}
