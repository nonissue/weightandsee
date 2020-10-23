import { Grid, Heading, Text, useColorModeValue } from "@chakra-ui/core";

import { Layout } from "../../components/Layout";
import { NextChakraLink } from "../../components/NextChakraLink";
import { Post, Posts } from "../../interfaces";

const demoTitle = "It Was Octarine, The Colour Of Magic";
const demoContent =
  "It was alive and glowing and vibrant and it was the undisputed pigment of the imagination, because wherever it appeared it was a sign that mere matter was a servant of the powers of the magical mind. It was enchantment itself. But Rincewind always thought it looked a sort of greenish-purple. It was all very well going on about pure logic and how the universe was ruled by logic and the harmony of numbers, but the plain fact of the matter was that the Disc was manifestly traversing space on the back of a giant turtle and the gods had a habit of going round to atheists' houses and smashing their windows.";

const FullbleedPost: React.FunctionComponent<Post> = ({
  author,
  tags,
  title,
  content,
  slug
}) => {
  const bg = useColorModeValue("gray.900", "gray.100");
  const text = useColorModeValue("gray.100", "gray.900");

  return (
    <Grid
      column="-1 / 1"
      w="100%"
      textColor={text}
      background={bg}
      p={["4", "4", "6", "6"]}
      pt={["4", "4", "6", "6"]}
      pb={["4", "4", "6", "6"]}
      m="auto"
      my="4"
      maxW={["100%", "100%", "100%", "75%"]}
      key={slug}
    >
      {" "}
      <img
        alt="Users Hero"
        src="https://picsum.photos/seed/non/2000/700?grayscale"
      />
      <NextChakraLink href="/posts/1">
        <Heading size="lg" mb="2" mt="2" textTransform="capitalize">
          {title} <Text fontStyle="italic">(featured post demo)</Text>
        </Heading>
      </NextChakraLink>
      <Heading size="sm" fontWeight="normal" fontFamily="body" mb={3}>
        — {author}
      </Heading>
      <Heading size="sm" fontFamily="body">
        {tags}
      </Heading>
      <Text>{content}</Text>
      <Text mt={2} fontStyle="italic" fontWeight="500">
        (Notice how this post is &apos;full-bleed&apos; in that it break out of
        the column the rest of the posts adhere to for their max width)
      </Text>
    </Grid>
  );
};

const posts: React.FunctionComponent<Posts> = () => {
  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <NextChakraLink href="/posts/1">
            <Heading size="lg" mb="2">
              It Was a Dark and Stormy Night
            </Heading>
          </NextChakraLink>
          <Text>
            A modern starting point for web dev, featuring next.js, chakra-ui,
            prisma and more. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Ut a mollis lorem. In fringilla lorem aliquet odio posuere
            scelerisque. Sed ornare nunc vel ante consequat, in rutrum massa
            tincidunt. Mauris quis ex vel enim facilisis tincidunt. In hac
            habitasse platea dictumst. Donec sodales ultrices urna, sed bibendum
            elit lacinia id. Morbi sed neque ante. Etiam ligula dui, congue sed
            malesuada sed, accumsan nec sem.
          </Text>
        </Grid>
        <FullbleedPost
          title={demoTitle}
          content={demoContent}
          tags={[]}
          author={"Andy"}
          id={1}
          slug={"slug"}
        />
        <Grid column="2" my="2" px={["4", "4", "2", "2"]}>
          <NextChakraLink href="/posts/1">
            <Heading size="lg" mb="2">
              The first time Yossarian saw the chaplain, he fell madly in love
              with him
            </Heading>
          </NextChakraLink>
          <Text>
            There was only one catch and that was Catch-22, which specified that
            a concern for one&apos;s safety in the face of dangers that were
            real and immediate was the process of a rational mind. Orr was crazy
            and could be grounded. All he had to do was ask; and as soon as he
            did, he would no longer be crazy and would have to fly more
            missions. Orr would be crazy to fly more missions and sane if he
            didn&apos;t, but if he was sane he had to fly them. If he flew them
            he was crazy and didn&apos;t have to; but if he didn&apos;t want to
            he was sane and had to. Yossarian was moved very deeply by the
            absolute simplicity of this clause of Catch-22 and let out a
            respectful whistle.
          </Text>
          <br />
          <Text>
            &quot;That&apos;s some catch, that Catch-22,&quot; he observed.
          </Text>
          <br />
          <Text>
            &quot;It&apos;s the best there is,&quot; Doc Daneeka agreed.
          </Text>
        </Grid>

        <Grid column="2" my="2" px={["4", "4", "2", "2"]}>
          <NextChakraLink href="/posts/1">
            <Heading size="lg" mb="2">
              He was an old man who fished alone in a skiff in the Gulf Stream
              and he had gone eighty-four days now without taking a fish
            </Heading>
          </NextChakraLink>
          <Text>
            In the first forty days a boy had been with him. But after forty
            days without a fish the boy’s parents had told him that the old man
            was now definitely and finally salao, which is the worst form of
            unlucky, and the boy had gone at their orders in another boat which
            caught three good fish the first week. It made the boy sad to see
            the old man come in each day with his skiff empty and he always went
            down to help him carry either the coiled lines or the gaff and
            harpoon and the sail that was furled around the mast. The sail was
            patched with flour sacks and, furled, it looked like the flag of
            permanent defeat.
          </Text>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default posts;
