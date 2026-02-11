import Link from 'next/link';
import { getDirectoryTree } from '@/lib/markdown';
import SidebarItem from './SidebarItem';

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

