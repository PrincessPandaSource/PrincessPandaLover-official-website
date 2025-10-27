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

    // Image optimization shortcodes
    eleventyConfig.addShortcode("image", async function (src, alt, width=null, height=null, lazy=true, classPara=null, sizes="(max-width: 768px), (max-width: 1280px), (max-width: 1920px), 100vw") {
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

                const ogWidth = options.sourceWidth;
                const wasResized = width && width !== ogWidth && [768, 1280, 1920].includes(width);

                if (format === 'webp') {
                    if (wasResized) {
                        return `${subDirName}webp/${width}/${name}.${format}`;
                    }
                    return `${subDirName}webp/${name}.${format}`;
                }

                return `${subDirName}${name}.${format}`;
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

        // Add image's style class if there's one
        if (classPara) {
            imageAttributes.class = classPara;
        }

        return Image.generateHTML(metadata, imageAttributes);
    })

    eleventyConfig.addShortcode("imageThumb", async function (src, alt, width=null, height=null, lazy=true, classPara=null, sizes="auto") {
        let imgWidth = null;
        if (width) {
            imgWidth = width * 2;
        }

        // Get original image metadata
        let ogMetadata = await Image(src, {
            widths: ["auto"],
            formats: ["auto"],
            outputDir: "./_site/images/",
            urlPath: "/images/",
            dryRun: true
        })

        // Get original width
        let ogWidth = null;
        const formatKeys = Object.keys(ogMetadata);
        if (formatKeys.length > 0) {
            ogWidth = ogMetadata[formatKeys[0]][0].width;
        }

        // See if specificed width is different from OG
        let widthsOption = ["auto"];
        if (imgWidth && imgWidth !== ogWidth) {
            widthsOption = [imgWidth, "auto"];
        }
        
        let metadata = await Image(src, {
            widths: widthsOption,
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

                const isThumb = width === imgWidth;

                if (format === 'webp') {
                    if (isThumb && imgWidth !== ogWidth) {
                        return `${subDirName}webp/thumb/${name}-${imgWidth}.${format}`;
                    }
                    return `${subDirName}webp/${name}.${format}`;
                }

                return `${subDirName}${name}.${format}`;
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

        // Add image's style class if there's one
        if (classPara) {
            imageAttributes.class = classPara;
        }

        return Image.generateHTML(metadata, imageAttributes);
    })

    eleventyConfig.addShortcode("imageGIFThumb", async function (src, alt, width=null, height=null, lazy=true, classPara=null, sizes="auto") {
        let imgWidth = null;
        if (width) {
            imgWidth = width * 2;
        }

        // Get original image metadata
        let ogMetadata = await Image(src, {
            widths: ["auto"],
            formats: ["auto"],
            outputDir: "./_site/images/",
            urlPath: "/images/",
            dryRun: true
        })

        // Get original width
        let ogWidth = null;
        const formatKeys = Object.keys(ogMetadata);
        if (formatKeys.length > 0) {
            ogWidth = ogMetadata[formatKeys[0]][0].width;
        }

        // See if specificed width is different from OG
        let widthsOption = ["auto"];
        if (imgWidth && imgWidth !== ogWidth) {
            widthsOption = [imgWidth, "auto"];
        }
        
        let metadata = await Image(src, {
            sharpOptions: {
                animated: true
            },
            widths: widthsOption,
            formats: ["gif"],
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

                const isThumb = width === imgWidth;

                if (isThumb && imgWidth !== ogWidth) {
                    return `${subDirName}thumb/${name}-${imgWidth}.gif`;
                }

                return `${subDirName}${name}.gif`;
            }
        });

        let imageAttributes = {
            alt,
            sizes: "auto",
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

        // Add image's style class if there's one
        if (classPara) {
            imageAttributes.class = classPara;
        }

        return Image.generateHTML(metadata, imageAttributes);
    })

    // Post date filters
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL);
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