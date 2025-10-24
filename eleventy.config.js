import { DateTime } from "luxon";
import Image from "@11ty/eleventy-img"
import path from "path"

export default function (eleventyConfig) {
    // Import pre-existing resources to build
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("_headers");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.addPassthroughCopy("google34125cee924c333d.html");

    // Parts of website not affected by Eleventy
    eleventyConfig.addPassthroughCopy("silverscripts");
    eleventyConfig.addPassthroughCopy("web-coding-practice/blurjack");

    // Permalink configration (no trailing slashes)
    eleventyConfig.addGlobalData("permalink", () => {
        return (data) => {
            const stem = data.page.filePathStem;

            // For the index file in the root
            if (stem === "/index") {
                return "/";
            }

            // For any file named "index"
            if (stem.endsWith('/index')) {
                return `${stem.slice(0, -6)}.html`;
            }

            return `${stem}.html`;
        }
    });

    // Image optimization shortcode
    eleventyConfig.addShortcode("image", async function (src, alt, width=null, height=null, lazy=true, sizes="(max-width: 768px), (max-width: 1280px), (max-width: 1920px), 100vw") {
        let metadata = await Image(src, {
            widths: [768, 1280, 1920, "auto"],
            formats: ["webp", "auto"],
            outputDir: "./_site/images/",
            urlPath: "/images/",
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                const srcPath = src.replace(/\\/g, '/');
                const imagesPathIndex = srcPath.indexOf('/images/');
                let subDirName = '';
                
                if (imagesPathIndex !== -1) {
                    const pathAfterImages = srcPath.substring(imagesPathIndex + '/images/'.length);
                    const subDirPath = path.dirname(pathAfterImages);
                    if (subDirPath && subDirPath !== '.') {
                        subDirName = subDirPath + '/';
                    }
                }

                const originalWidth = options.sourceWidth;
                const wasResized = width && width !== originalWidth && [768, 1280, 1920].includes(width);

                if (format === 'webp') {
                    if (wasResized) {
                        return `${subDirName}webp/${width}/${name}.${format}`;
                    }
                    return `/${subDirName}webp/${name}.${format}`;
                }

                return `/${subDirName}${name}.${format}`;
            }
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: lazy ? "lazy" : "eager",
            decoding: "async"
        };

        // Add inline style for resizing in webpage
        if (width || height) {
            let styles = [];
            if (width != null) styles.push(`max-width: ${width}px`);
            if (height != null) styles.push(`max-height: ${height}px`);
            imageAttributes.style = styles.join('; ');
        }

        return Image.generateHTML(metadata, imageAttributes);
    })

    // Post date filter
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
    });

    // Collections
    const blogCollectionTags = ["tpt2May2024", "tpt2June2024", "tpt2July2024"];

    blogCollectionTags.forEach(tag => {
        eleventyConfig.addCollection(tag, function(collectionApi) {
            return collectionApi.getFilteredByTag(tag).sort(function (a ,b) {
                return b.date - a.date;
            })
        });
    })
}