import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostData = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    readTime?: string;
  };
};

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getAllPosts(): PostData[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      // Ensure required frontmatter fields exist
      if (!data.title || !data.date || !data.description) {
        return null; // skip invalid files
      }

      return {
        slug,
        frontmatter: {
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags || [],
          readTime: data.readTime || "",
        },
      } satisfies PostData;
    })
    .filter(Boolean) as PostData[];
}
