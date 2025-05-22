import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Path to your /posts folder
const postsDirectory = path.join(process.cwd(), "src/posts");

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  slug: string;
  tags?: string[];
};

export type PostData = {
  slug: string;
  frontmatter: PostMeta;
  content: string;
};

/**
 * Get all MDX filenames from /posts
 */
export function getAllPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

/**
 * Get a single post's content and metadata
 */
export function getPostBySlug(slug: string): PostData {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: {
      ...(data as PostMeta),
      slug: realSlug,
    },
    content,
  };
}

/**
 * Get metadata for all posts (for blog listing)
 */
export function getAllPosts(): PostData[] {
  const slugs = getAllPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}
