
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'contents/knowledge');

function getAllMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllMarkdownFiles(filePath, fileList);
        } else if (path.extname(file) === '.md') {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function renameFiles() {
    const files = getAllMarkdownFiles(CONTENT_DIR);
    let count = 0;

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(content);

            if (data.title) {
                const dir = path.dirname(filePath);
                // Sanitize title for filename
                const safeTitle = data.title.replace(/[\/\\:*?"<>|]/g, '-');
                const newFilename = `${safeTitle}.md`;
                const newFilePath = path.join(dir, newFilename);

                if (filePath !== newFilePath) {
                    console.log(`Renaming: ${path.basename(filePath)} -> ${newFilename}`);
                    fs.renameSync(filePath, newFilePath);
                    count++;
                }
            }
        } catch (e) {
            console.error(`Error processing ${filePath}:`, e);
        }
    });

    console.log(`Renamed ${count} files.`);
}

renameFiles();
