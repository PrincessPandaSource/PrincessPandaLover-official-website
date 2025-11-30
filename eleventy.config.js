import { DateTime } from "luxon";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import fs from "fs";

export default function (eleventyConfig) {
    // Import pre-existing resources to build
    eleventyConfig.addPassthroughCopy("images/*.svg");
    eleventyConfig.addPassthroughCopy("images/*.ico");
    eleventyConfig.addPassthroughCopy("images/logo.png")
    eleventyConfig.addPassthroughCopy("images/background-accessible.png");
    eleventyConfig.addPassthroughCopy("images/avatar.png");
    eleventyConfig.addPassthroughCopy("images/link-icons");
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("_headers");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("google34125cee924c333d.html");

    // Parts of website not affected by Eleventy
    eleventyConfig.addPassthroughCopy("silverscripts");
    eleventyConfig.addPassthroughCopy("web-coding-practice/blurjack");

    // Remove trailing slashes from pages that don't need them
	eleventyConfig.addGlobalData("permalink", () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});

    // Image optimization
    eleventyConfig.addPlugin(Image.eleventyImageTransformPlugin, {
        formats: ["webp", "auto"],
        outputDir: "_site/images/",
        urlPath: "/images/",
        widths: [768, 1280, 1920, "auto"],
        sharpOptions: {
            animated: true,
        },
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
		    const name = path.basename(src, extension);
            const subDirPath = path.dirname(src.substring('images/'.length));
            const subDirName = (subDirPath && subDirPath !== '.') ? subDirPath + '/' : '';

            return `${subDirName}${name}-${width}.${format}`;
        },
        htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
                sizes: "100vw"
			},
			pictureAttributes: {}
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