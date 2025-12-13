import { DateTime } from "luxon";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import fs from "fs";

export default function (eleventyConfig) {
    // Import pre-existing resources to build
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("_headers");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("google34125cee924c333d.html");
    eleventyConfig.addPassthroughCopy("silverscripts/css")
    eleventyConfig.addPassthroughCopy("silverscripts/js")

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
                sizes: "(max-width: 768px) 768px, (max-width: 1280px) 1280px, (max-width: 1920px) 1920px, 100vw"
			},
			pictureAttributes: {},
            fallback: "largest"
		}
    });

    // Date filters
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL);
    });

    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-MM-dd');
    });

    // Add last modified dates to all processed pages for sitemap
    eleventyConfig.addGlobalData("eleventyComputed", {
        lastModified: (data) => {
            const fileStats = fs.statSync(data.page.inputPath);
            return fileStats.mtime;
        }
    });

    // Strip extension filter
    eleventyConfig.addFilter("stripExtension", (filename) => {
        return filename.replace(/\.[^/.]+$/, "")
    });

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
}

// Setting all HTML pages to use Nunjunks
export const config = {
    htmlTemplateEngine: "njk",
};