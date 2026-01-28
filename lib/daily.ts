import fs from "fs";
import matter from "gray-matter";
import { getAllMarkdownPaths } from "./markdown";
import "react-calendar/dist/Calendar.css";

export type DailyMap = Record<
    string,
    { title: string; slug: string[] }[]
>;

export function getDailyOutputs(): DailyMap {
    const files = getAllMarkdownPaths();
    const dailyMap: DailyMap = {};

    files.forEach(({ slug, filePath }) => {
        const file = fs.readFileSync(filePath, "utf8");
        const { data } = matter(file);

        if (typeof data.date !== "string") return;
        const date = data.date;

        if (!dailyMap[date]) {
            dailyMap[date] = [];
        }

        dailyMap[date].push({
            title: data.title ?? slug[slug.length - 1],
            slug,
        });
    });

    return dailyMap;
}
