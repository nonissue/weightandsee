import { List as ChakraList, ListItem } from "@chakra-ui/core";
import { NextChakraLink } from "./NextChakraLink";
import { User } from "../interfaces";

type Props = {
  items: User[];
};

const List: React.FunctionComponent<Props> = ({ items }) => (
  <ChakraList>
    {items.map(item => (
      <ListItem key={item.id}>
        <NextChakraLink fontWeight="bold" href={`/users/${item.id}`}>
          {item.id}: {item.name}
        </NextChakraLink>
      </ListItem>
    ))}
  </ChakraList>
);

export default List;
