// componentize some of this
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession, Session } from "next-auth/client";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Confirmation, Layout } from "../../components";
import { FormResult } from "../../interfaces";

// eslint-disable-next-line import/no-named-as-default
import db from "prisma";
const prisma = db.getInstance().prisma;

type Person = {
  id: number;
  name: string;
};

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, (_, k) => k + 1);
}

// When form submitted, verify that no entries duplicated

// When form submitted, verify that no entries duplicated
export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);
  const session = await getSession(context);

  const people: Person[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  return {
    props: { people, session },
  };
};

type FormData = {
  date: Date;
  entries: {
    name: string;
    weight: string;
  }[];
  updateCurrentWeight: boolean;
};

const CreateWeights: React.FunctionComponent<{
  people: Person[];
  session: Session;
}> = ({ people, session }) => {
  const router = useRouter();
  const { handleSubmit, errors, control, watch } = useForm<FormData>();
  const [entryCount, setEntryCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const startDate = new Date();
  const watched = watch("entries");
  console.log(watched);

  const formBorderColor = useColorModeValue("gray.100", "gray.700");
  const headerColor = useColorModeValue("pink.400", "pink.200");

  const confirmationCallback = () => {
    setEntryCount(entryCount - 1);
  };

  const getPeople = () => {
    const selected = watched?.map((entry) => entry.name);

    if (selected) {
      const filteredPeople = people.filter(
        (person: Person) => selected.indexOf(person.name) === -1
      );

      return filteredPeople;
    } else {
      return people;
    }
  };

  const onSubmit = async (data: FormResult) => {
    setIsSubmitted(true);
    console.log(data);

    try {
      await fetch(`/api/weigh-ins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await router.push("/weights");
    } catch (e) {
      console.log(e);
    }
  };

  if (!session) {
    return (
      <Layout>
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <Heading size="md" mt="6" mb="4">
            Unauthorized
          </Heading>
          <Box>You need to be signed in to view this page</Box>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} border="0px">
        <Grid
          column="2"
          my="8"
          mx={["0", "2"]}
          px={["4", "4", "4", "4"]}
          py="4"
          border={["0px", "1px"]}
          shadow={useColorModeValue("sm", "lg")}
          borderRadius={["8px", "8px"]}
          borderColor={[formBorderColor, formBorderColor]}
        >
          <Flex
            flexDirection={["row", "row", "row", "row"]}
            justifyContent="space-between"
            alignContent="center"
            mb="4"
          >
            <Heading
              size="lg"
              fontWeight="725"
              fontFamily="Recursive"
              color={headerColor}
              // mb="2"
              style={{
                fontVariationSettings: `"MONO" 0, "CRSV" 1, "CASL" 0.15, "slnt" 0`,
              }}
            >
              Weigh-In
            </Heading>

            <Stack direction="row" spacing="1" alignItems="center">
              <Button
                w="100%"
                onClick={() => {
                  setEntryCount(entryCount + 1);
                }}
                variant="outline"
                size="xs"
              >
                + Entry
              </Button>
              {entryCount !== 1 && (
                <Confirmation
                  title="- Entry"
                  action={confirmationCallback}
                  variant="outline"
                  w="100%"
                  size="xs"
                  textColor="red.400"
                />
              )}
            </Stack>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {createArrayWithNumbers(entryCount).map((i) => {
                // otherwise first item in array is empty
                const index = i - 1;

                return (
                  <div key={index}>
                    <Stack
                      spacing={2}
                      direction={["column", "row"]}
                      w="100%"
                      key={index}
                    >
                      <FormControl id="person" w="100%">
                        <Controller
                          name={`entries.[${index}].name`}
                          control={control}
                          defaultValue=""
                          errorBorderColor="red.300"
                          rules={{ required: true }}
                          render={({ value, onChange, onBlur }) => (
                            <Select
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              value={value ? value : undefined}
                              placeholder={value ? value : "Select Person"}
                              isInvalid={
                                errors.entries?.[index]?.name ? true : false
                              }
                            >
                              {getPeople().map((p: Person) => {
                                return (
                                  <option key={p.id} value={p.name}>
                                    {p.name}
                                  </option>
                                );
                              })}
                            </Select>
                          )}
                        />
                      </FormControl>

                      <FormControl id="person">
                        <Controller
                          name={`entries.[${index}].weight`}
                          control={control}
                          defaultValue=""
                          rules={{ required: true, min: 2 }}
                          render={({ value, onChange }) => (
                            <InputGroup w="100%">
                              <Input
                                value={value}
                                onChange={onChange}
                                placeholder="200.0"
                                isInvalid={
                                  errors.entries?.[index]?.weight ? true : false
                                }
                              />
                              <InputRightAddon
                                // eslint-disable-next-line react/no-children-prop
                                children="lbs"
                                pointerEvents="none"
                              />
                            </InputGroup>
                          )}
                        />
                      </FormControl>
                    </Stack>
                    <Divider pt="2" display={["block", "block"]} />
                  </div>
                );
              })}

              <Stack
                direction={["column", "row", "row", "row"]}
                alignContent="center"
                display="flex"
              >
                <Stack w="100%" direction="column">
                  <Controller
                    control={control}
                    name="date"
                    defaultValue={startDate}
                    render={({ onChange, onBlur, value }) => (
                      <ReactDatePicker
                        onChange={(date) => {
                          onChange(date);
                        }}
                        onBlur={onBlur}
                        selected={value}
                        dateFormat="yyyy/MM/dd"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.date && (
                    <Box
                      fontFamily="mono"
                      fontSize="xs"
                      textColor="red.400"
                      pl="1"
                    >
                      Required
                    </Box>
                  )}
                </Stack>
                <FormControl
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={["1", "0"]}
                  py={["1", "1"]}
                  px={["1", "1"]}
                >
                  <Controller
                    control={control}
                    name="updateCurrentWeight"
                    defaultValue={true}
                    render={({ onChange, onBlur }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        my={["1", "1"]}
                        colorScheme="pink"
                        mx={["0", "0"]}
                        defaultIsChecked
                      >
                        Update Profile Weight
                      </Checkbox>
                    )}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Box display="flex">
              <Button
                colorScheme="pink"
                type="submit"
                mx="auto"
                mt="4"
                w={["100%", "100%"]}
                isLoading={isSubmitted}
              >
                Submit Weigh-In
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateWeights;
