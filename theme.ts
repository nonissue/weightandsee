import { extendTheme } from "@chakra-ui/core";
import { mode } from "@chakra-ui/theme-tools";

const sans = [
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

const serif = [
  "DM Serif Display",
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

const mono = [
  "DM Mono",
  "Cousine",
  "Consolas",
  "'Courier New'",
  "Courier",
  "monospace",
].join(",");

export default extendTheme({
  components: {
    Link: {
      variants: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        link: (props: any) => ({
          color: mode("yellow.700", "yellow.300")(props),
        }),
      },
    },
  },
  fonts: {
    body: sans,
    heading: serif,
    mono,
  },
});