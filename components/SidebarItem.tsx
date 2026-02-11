"use client";

import { useState } from "react";
import Link from "next/link";
import { DirectoryNode } from "@/lib/markdown";
import { usePathname } from "next/navigation";

export default function SidebarItem({ node }: { node: DirectoryNode }) {
    const pathname = usePathname();
    const isActive = pathname === node.path;
    // Default collapsed for directories
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if we just want to toggle
        setIsOpen(!isOpen);
    };

    if (node.type === "file") {
        return (
            <li>
                <Link
                    href={node.path}
                    className={`block px-3 py-2 text-sm rounded-md transition-all border-l-2 ${isActive
                            ? "bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 border-blue-600 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800 border-transparent hover:border-blue-600"
                        }`}
                >
                    {node.title || node.name}
                </Link>
            </li>
        );
    }

    // Directory node
    return (
        <li className="mb-1 mt-3 first:mt-0">
            <div className="flex items-center justify-between group cursor-pointer" onClick={toggleOpen}>
                <div className="flex items-center w-full">
                    <span
                        className="flex-grow px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                        {node.title || node.name}
                    </span>
                    <span className="mr-2 text-xs text-gray-400">
                        {isOpen ? "▼" : "▶"}
                    </span>
                </div>
            </div>
            {/* Link to category page if needed, but for now just toggle */}

            {isOpen && (
                <ul className="mt-1 border-l border-gray-200 dark:border-gray-800 ml-3 pl-1 space-y-0.5">
                    {node.children?.map((child) => (
                        <SidebarItem key={child.path} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}
