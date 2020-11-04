const descriptionMd = `
  An easy way to track weights as a group.
`;

const description = descriptionMd
  .replace(/\[([^\]]+)\](\([^)]+\)|\[[^\]]+\])/g, "$1")
  .replace(/\n/g, "")
  .replace(/\s{2,}/g, " ")
  .trim();

module.exports = {
  title: "Weight&See",
  descriptionMd,
  description,
  url: "https://weightandsee.xyz",
  twitterUsername: "@nonissue",
  email: "andy@nonissue.org",
  socials: {
    GitHub: "https://github.com/nonissue/weightandsee",
    Twitter: "https://twitter.com/nonissue",
  },
  themeColor: "#F6E05E",
};
