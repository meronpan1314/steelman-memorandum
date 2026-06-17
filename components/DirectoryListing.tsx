import Link from "next/link";
import { DirectoryNode } from "@/lib/markdown";

export default function DirectoryListing({ node }: { node: DirectoryNode }) {
    const children = node.children ?? [];

    return (
        <div className="max-w-4xl mx-auto py-8 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 border-l-4 border-emerald-500 pl-4">
                {node.title}
            </h1>

            <ul className="grid gap-4">
                {children.map((child) => (
                    <li key={child.path} className="group">
                        <Link
                            href={child.path}
                            className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wide">
                                    {child.type === "directory" ? "Folder" : "Post"}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                {child.title}
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
