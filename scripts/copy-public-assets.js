const copy = require("copy");

module.exports = async () => {
  copy("assets/build/**/*", "public", () => {});
};
