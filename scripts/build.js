require("cross-fetch/polyfill");

const copyPublicAssets = require("./copy-public-assets");
const generateFavicons = require("./generate-favicons");

async function build() {
  // if we don't copy original favicon, it doesn't load in prod
  await copyPublicAssets();
  // we should test for this before running it each time
  // maybe just include the public folder in git?
  // it slows down builds significantly
  await generateFavicons();
}

build();
