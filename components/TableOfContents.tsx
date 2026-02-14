import Link from "next/link";
import { TOCItem } from "@/lib/markdown";

type Props = {
    toc: TOCItem[];
};

export default function TableOfContents({ toc }: Props) {
    if (!toc || toc.length === 0) return null;

    return (
        <nav className="toc sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                    <li
                        key={item.id}
                        className={`pl-${item.level === "h3" ? "4" : "0"}`}
                    >
                        <Link
                            href={`#${item.id}`}
                            className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
