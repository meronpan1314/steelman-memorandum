import Link from "next/link";

export default function JavaPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <h1>Java</h1>
            <ul>
                <li><Link href="/knowledge/java/access-modifier">Access Modifier</Link></li>
                <li><Link href="/knowledge/java/interface">Interface</Link></li>
                <li><Link href="/knowledge/java/oop">OOP</Link></li>
            </ul>
        </main>
    );
}
