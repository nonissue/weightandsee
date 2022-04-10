import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const sans = [
  "Inter",
  "DM Sans",
  "-apple-system",
  "BlinkMacSystemFont",
  "'Segoe UI'",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "'Open Sans'",
  "'Helvetica Neue'",
  "sans-serif",
].join(",");

// const serif = [
//   "DM Serif Display",
//   "-apple-system",
//   "BlinkMacSystemFont",
//   "'Segoe UI'",
//   "Roboto",
//   "Oxygen",
//   "Ubuntu",
//   "Cantarell",
//   "'Open Sans'",
//   "'Helvetica Neue'",
//   "sans-serif",
// ].join(",");

const mono = [
  "monospace",
  "DM Mono",
  "Cousine",
  "Consolas",
  "'Courier New'",
  "Courier",
  "monospace",
].join(",");

const customHeading = [
  "Recursive",
  "-apple-system",
  "BlinkMacSystemFont",
  "'Segoe UI'",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "'Open Sans'",
  "'Helvetica Neue'",
  "sans-serif",
].join(",");

export default extendTheme({
  components: {
    Link: {
      variants: {
        // these both work!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        link: (props: any) => ({
          color: mode("blue.700", "blue.300")(props),
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        external: (props: any) => ({
          color: mode("purple.600", "purple.300")(props),
        }),
      },
    },
  },
  fonts: {
    body: sans,
    heading: customHeading,
    mono,
  },
});
