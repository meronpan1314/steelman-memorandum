
import Link from 'next/link';
import { getDirectoryTree, DirectoryNode } from '@/lib/markdown';

export default function Sidebar() {
    const tree = getDirectoryTree();

    return (
        <nav className="w-64 min-w-[16rem] h-screen overflow-y-auto bg-gray-50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-4 sticky top-0">
            <div className="mb-6 space-y-2">
                <Link href="/" className="font-bold text-xl block hover:text-blue-600">
                    元鉄鋼マンエンジニアの備忘録
                </Link>
                <Link
                    href="/daily"
                    className="block px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition-colors"
                >
                    Daily Calendar
                </Link>
            </div>
            <ul className="space-y-1">
                {tree.map(node => (
                    <SidebarItem key={node.path} node={node} />
                ))}
            </ul>
        </nav>
    );
}


function SidebarItem({ node }: { node: DirectoryNode }) {
    if (node.type === 'file') {
        return (
            <li>
                <Link
                    href={node.path}
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-all border-l-2 border-transparent hover:border-blue-600"
                >
                    {node.title || node.name}
                </Link>
            </li>
        );
    }

    return (
        <li className="mb-1 mt-3 first:mt-0">
            <Link
                href={node.path}
                className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
                {node.title || node.name}
            </Link>
            <ul className="mt-1 border-l border-gray-200 dark:border-gray-800 ml-3 pl-1">
                {node.children?.map(child => (
                    <SidebarItem key={child.path} node={child} />
                ))}
            </ul>
        </li>
    );
}

