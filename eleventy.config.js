import { DateTime } from "luxon";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import fs from "node:fs";
import { execSync } from "node:child_process";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
    // Import pre-existing resources to build
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("_headers");
    eleventyConfig.addPassthroughCopy("_redirects");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("google34125cee924c333d.html");
    eleventyConfig.addPassthroughCopy("silverscripts/css")
    eleventyConfig.addPassthroughCopy("silverscripts/js")
    eleventyConfig.addPassthroughCopy("sonic-4-countdown/assets")
    eleventyConfig.addPassthroughCopy("sonic-4-countdown/*.css")
    eleventyConfig.addPassthroughCopy("sonic-4-countdown/*.js")

    // Import original images
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("silverscripts/img");

    // Parts of website not affected by Eleventy
    eleventyConfig.addPassthroughCopy("web-coding-practice/blurjack");

    // Remove trailing slashes from pages that don't need them
	eleventyConfig.addGlobalData("permalink", () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});

    // Image optimization
    eleventyConfig.addPlugin(Image.eleventyImageTransformPlugin, {
        formats: ["webp", "auto"],
        outputDir: "_site/",
        urlPath: "/",
        widths: [768, 1280, 1920, "auto"],
        sharpOptions: {
            animated: true,
        },
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
		    const name = path.basename(src, extension);
            const dir = path.dirname(src);

            return `${dir}/${name}-${width}.${format}`;
        },
        htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
                sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, (max-width: 1920px) 100vw, 100vw"
			},
			pictureAttributes: {},
            fallback: "largest"
		}
    });

    // Date filters
    eleventyConfig.addFilter("dateToFormat", (dateObj, format) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL);
    });

    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-MM-dd');
    });

    eleventyConfig.addFilter("schemaDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' })
            .setZone('America/Chicago', {keepLocalTime: true})
            .set({ hour: 12, minute: 0, second: 0})
            .toISO();
    });

    eleventyConfig.addFilter("myRSSDate", (dateObj) => {
        const date = new Date(dateObj);
        date.setUTCHours(12, 0, 0, 0);
        return date.toUTCString();
    });

    // Cache for Git dates to speed up build
    const gitDateCache = new Map();

    // Pre-load Git history to avoid spawning process for every file (Gemini 3 Pro)
    try {
        const output = execSync('git log --name-only --format="GIT_DATE:%cI" --max-count=500', { 
            encoding: 'utf-8',
            maxBuffer: 10 * 1024 * 1024 // 10MB buffer
        });
        
        let currentDate = null;
        output.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;
            
            if (trimmed.startsWith('GIT_DATE:')) {
                currentDate = new Date(trimmed.slice(9));
            } else if (currentDate) {
                // Git outputs paths like "src/pages/about.md"
                // Eleventy uses "./src/pages/about.md"
                const key = "./" + trimmed;
                if (!gitDateCache.has(key)) {
                    gitDateCache.set(key, currentDate);
                }
            }
        });
    } catch (e) {
        console.warn("Git log failed, falling back to individual checks:", e.message);
    }

    // Get last modified date for sitemap via Git (Gemini 3 Pro)
    eleventyConfig.addFilter("lastModifiedDate", (page) => {
        const inputPath = page.inputPath;
        
        // Helper to get date for a specific path
        const getDateForPath = (path) => {
            if (gitDateCache.has(path)) {
                return gitDateCache.get(path);
            }
            
            // Fallback: try fs stats if not in git log (e.g. new file)
            try {
                const stats = fs.statSync(path);
                return stats.mtime;
            } catch (e) {
                return null;
            }
        };

        let latestDate = getDateForPath(inputPath);

        // If this is a paginated page, check the items on this specific page
        if (page.data && page.data.pagination && page.data.pagination.items) {
            for (const item of page.data.pagination.items) {
                if (item.inputPath) {
                    const itemDate = getDateForPath(item.inputPath);
                    if (itemDate && (!latestDate || itemDate > latestDate)) {
                        latestDate = itemDate;
                    }
                }
            }
        }

        return latestDate || new Date();
    });

    // Strip extension filter
    eleventyConfig.addFilter("stripExtension", (filename) => {
        return filename.replace(/\.[^/.]+$/, "")
    });

    // Wolf with a Blog tags
    // Set up collection of blog tags
    eleventyConfig.addCollection("blogTags", function(collectionApi) {
        let blogTags = new Array();
        const posts = collectionApi.getFilteredByTag("blog");

        posts.forEach(post => {
            const postTags = post.data.blogTags;
            postTags.forEach(tag => {
                if (!(blogTags.includes(tag))) blogTags.push(tag);
            });
        });

        return blogTags;
    })

    // Filter for filtering blogposts by tag
    eleventyConfig.addFilter("filterByBlogTag", function(posts, blogTag) {
        // Lowercase is used for consistency
        blogTag = blogTag.toLowerCase();

        const filteredPosts = posts.filter(post => {
            const postTags = post.data.blogTags.map(t => t.toLowerCase());
            return postTags.includes(blogTag);
        })

        return filteredPosts;
    })

    // Fun blog collections
    const funBlogCollectionTags = ["tpt2Log"];

    funBlogCollectionTags.forEach(tag => {
        eleventyConfig.addCollection(tag, function(collectionApi) {
            const grouped = collectionApi
                .getFilteredByTag(tag)
                .reverse()
                .reduce((acc, entry) => {
                    const monthKey = DateTime.fromJSDate(entry.date, { zone: 'utc' }).toFormat('yyyy-MM');
                    (acc[monthKey] ??= []).push(entry);
                    return acc;
                }, {});

            return Object.entries(grouped).map(([monthKey, entries]) => ({
                monthKey,
                entries
            }));
        });

        eleventyConfig.addCollection(tag + "RSS", function(collectionApi) {
            return collectionApi.getFilteredByTag(tag);
        });
    });

    eleventyConfig.addFilter("getMonthName", (monthKey) => {
        if (!monthKey) return '';
        const dateStr = String(monthKey) + '-01';
        const dt = DateTime.fromISO(dateStr);
        
        if (!dt.isValid) {
            console.error('Invalid date for monthKey:', monthKey, 'monthKey\'s type:', typeof monthKey);
            return '';
        }

        return dt.toFormat('MMMM');
    });

    eleventyConfig.addFilter("getYear", (monthKey) => {
        if (!monthKey) return '';
        return String(monthKey).split('-')[0];
    });

    // For code embeds
    eleventyConfig.addPlugin(syntaxHighlight);

    // For RSS feeds
    eleventyConfig.addPlugin(pluginRss);
}

// Setting all HTML pages to use Nunjucks
export const config = {
    htmlTemplateEngine: "njk",
};