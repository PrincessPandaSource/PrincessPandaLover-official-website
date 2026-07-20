import { DateTime } from "luxon";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginGitCommitDate from "eleventy-plugin-git-commit-date";
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
    eleventyConfig.addPassthroughCopy("web-coding-practice/it-s-raining-men");
    eleventyConfig.addPassthroughCopy("web-coding-practice/sonic-the-hedgehog-character-rng");
    eleventyConfig.addPassthroughCopy("web-coding-practice/tetris-sunset");

    // Remove trailing slashes from pages that don't need them
	eleventyConfig.addGlobalData("permalink", () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});

    // Add production field to global data if production build is made
    if (process.env.ENVIRONMENT == "production") {
        eleventyConfig.addGlobalData("production", true);
    }

    // Image optimization
    eleventyConfig.addPlugin(Image.eleventyImageTransformPlugin, {
        formats: ["webp"],
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

    eleventyConfig.addFilter("dateFromStr", (str) => {
        return new Date(str);
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

    // For sitemaps (and anywhere else that needs last modified date)
    eleventyConfig.addPlugin(pluginGitCommitDate);

    // For RSS feeds
    eleventyConfig.addPlugin(pluginRss);
}

// Setting all HTML pages to use Nunjucks
export const config = {
    htmlTemplateEngine: "njk",
};