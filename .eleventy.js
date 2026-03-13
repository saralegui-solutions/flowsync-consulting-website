module.exports = function(eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Copy demo framework assets (for interactive demos)
  eleventyConfig.addPassthroughCopy({"../portfolio/demo-framework": "portfolio/demo-framework"});

  // Copy demo.html files for case studies that have them
  eleventyConfig.addPassthroughCopy({"../portfolio/suitelet-commission-reporting/demo.html": "portfolio/suitelet-commission-reporting/demo.html"});
  eleventyConfig.addPassthroughCopy({"../portfolio/suitelet-transaction-lookup/demo.html": "portfolio/suitelet-transaction-lookup/demo.html"});
  eleventyConfig.addPassthroughCopy({"../portfolio/suitelet-board-repair-tracking/demo.html": "portfolio/suitelet-board-repair-tracking/demo.html"});

  // Create portfolio collection
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    return collectionApi.getFilteredByTag("portfolio");
  });

  // Configure directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
