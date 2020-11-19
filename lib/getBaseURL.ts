export const getBaseURL = (): string => {
  let baseURL;
  if (process.env.NODE_ENV === "development") {
    // local dev
    baseURL = "http://localhost:3000";
  } else if (process.env.VERCEL_URL === "weightandsee.xyz") {
    // deployed to production
    baseURL = "https://weightandsee.xyz";
  } else if (
    process.env.VERCEL_URL === "" &&
    process.env.NODE_ENV === "production"
  ) {
    // locally running in production mode
    baseURL = "http://localhost:4000";
  } else {
    // deployed to preview branch
    baseURL = `https://${process.env.VERCEL_URL}`;
  }

  // just in case we fall through
  if (baseURL === "") {
    baseURL = "https://dev.weightandsee.xyz";
  }

  return baseURL;
};
