import Link from "next/link";
import { MarkdownMeta } from "@/lib/markdown";

type Props = {
    prev: MarkdownMeta | null;
    next: MarkdownMeta | null;
};

export default function ArticleNavigation({ prev, next }: Props) {
    if (!prev && !next) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            {prev ? (
                <Link
                    href={`/knowledge/${prev.slug.join("/")}`}
                    className="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group text-left"
                >
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-blue-500">
                        ← Previous
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {prev.title}
                    </span>
                </Link>
            ) : (
                <div /> // Spacer
            )}

            {next ? (
                <Link
                    href={`/knowledge/${next.slug.join("/")}`}
                    className="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group text-right"
                >
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-blue-500">
                        Next →
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {next.title}
                    </span>
                </Link>
            ) : (
                <div /> // Spacer
            )}
        </div>
    );
}
