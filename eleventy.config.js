// TODO consider using eleventy as the final builder/processor and using parcel only for js bundling
// rather than having eleventy only for templates and parcel for bundling everything
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const mdk = require("markdown-it-katex")

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mdk))

  // attempts to extracts a mini excerpt preview given a post
  // uses the first paragraph as the excerpt's content
  eleventyConfig.addFilter("excerpt", (postContent) => {
    if (!postContent) return ""
    const firstP = postContent.indexOf("<p>")
    if (firstP >= 0) {
      const endP = postContent.indexOf("</p>")
      return postContent.substr(firstP, endP + 4)
    }
    return ""
  })

  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    passthroughFileCopy: true,
  }
}
