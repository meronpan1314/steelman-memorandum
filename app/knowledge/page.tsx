import Link from "next/link";

export default function Knowledge() {
    return (
        <main style={{ padding: "2rem" }}>
            <h1>Knowledge</h1>
            <p>分野ごとに整理した技術と思考の記録</p>

            <ul>
                <li><Link href="/knowledge/java">Java</Link></li>
                <li><Link href="/knowledge/web">Web</Link></li>
                <li><Link href="/knowledge/design">Design</Link></li>
            </ul>
        </main>
    );
}
