// componentize some of this

import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// eslint-disable-next-line import/no-named-as-default
import Router from "next/router";

import { useForm, Controller } from "react-hook-form";
// eslint-disable-next-line import/no-named-as-default
import ReactDatePicker from "react-datepicker";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  Input,
  Select,
  Stack,
  useColorModeValue,
  createStandaloneToast,
} from "@chakra-ui/react";

import { Confirmation, Layout } from "../../components";
import { Participants, FormData, FormResult } from "../../interfaces";

import "react-datepicker/dist/react-datepicker.css";

import db from "../../prisma/db";
const prisma = db.getInstance().prisma;

type Person = {
  id: number;
  name: string;
  nickName: string;
};

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, (_, k) => k + 1);
}

// When form submitted, verify that no entries duplicated
// export const getStaticProps: GetStaticProps = async () => {
//   const people = await prisma.person.findMany({
//     // select: { name: true, nickName: true },
//     select: {
//       id: true,
//       name: true,
//       nickName: true,
//     },
//     orderBy: { name: "asc" },
//   });

//   return {
//     props: { people },
//   };
// };

import theme from "../../theme";
const toast = createStandaloneToast({ theme: theme });

// When form submitted, verify that no entries duplicated
export const getServerSideProps: GetServerSideProps = async () => {
  const people = await prisma.person.findMany({
    // select: { name: true, nickName: true },
    select: {
      id: true,
      name: true,
      nickName: true,
    },
    orderBy: { name: "asc" },
  });

  return {
    props: { people },
  };
};

const CreateWeights: React.FunctionComponent<Participants> = ({
  people,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { handleSubmit, errors, control, watch } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entryCount, setEntryCount] = useState(1);

  const watched = watch("entries");
  const startDate = new Date();

  const formBorderColor = useColorModeValue("gray.200", "gray.700");

  const getPeople = () => {
    const selected = watched?.map((entry) => entry.name);

    if (selected) {
      const filteredPeople = people.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (person: Person) => selected.indexOf(person.name as any) === -1
      );

      return filteredPeople;
    } else {
      return people;
    }
  };

  const confirmationCallback = () => {
    setEntryCount(entryCount - 1);
  };

  const onSubmit = async (data: FormResult) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      const submitResponse = await fetch(`/api/weigh-ins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (submitResponse.status === 500) {
        console.log("Error submitting weight!");

        toast({
          title: "Error",
          description: "Unable to add the weight(s).",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setIsSubmitting(false);
      }

      if (submitResponse.status === 200) {
        toast({
          title: "Added",
          description: "Added weight(s).",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setIsSubmitting(false);
        await Router.push("/weights");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} border="0px">
        <Grid
          column="2"
          my="4"
          mx={["4", "4", "2", "2"]}
          p="4"
          border="1px"
          borderRadius="10px"
          shadow="sm"
          borderColor={formBorderColor}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {createArrayWithNumbers(entryCount).map((i) => (
                <Stack spacing={2} key={i}>
                  <FormControl id="person">
                    <Controller
                      name={`entries.[${i}].name`}
                      // as={Select}
                      control={control}
                      // placeholder="Select Person"
                      defaultValue=""
                      isInvalid={errors.entries?.[i]?.name ? true : false}
                      errorBorderColor="red.300"
                      rules={{ required: true }}
                      render={({ onChange, onBlur, value }) => (
                        <Select
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                          value={value ? value : undefined}
                          placeholder={value ? value : "Select Person"}
                          isInvalid={errors.entries?.[i]?.name ? true : false}
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
                  {errors.entries?.[i]?.name && false && (
                    <Box
                      fontFamily="mono"
                      fontSize="xs"
                      textColor="red.400"
                      pl="1"
                    >
                      Required
                    </Box>
                  )}

                  <FormControl id="person">
                    <Controller
                      name={`entries.[${i}].weight`}
                      control={control}
                      as={Input}
                      placeholder="Weight (lbs)"
                      defaultValue=""
                      isInvalid={errors.entries?.[i] ? true : false}
                      errorBorderColor="red.300"
                      rules={{
                        required: true,
                        min: 2,
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Please enter a number",
                        },
                      }}
                    />
                    {console.log(errors.entries?.[i]?.weight)}
                    {errors.entries?.[i]?.weight && (
                      <Box
                        fontFamily="mono"
                        fontSize="xs"
                        textColor="red.400"
                        pl="1"
                      >
                        Warning:{" "}
                        {errors.entries?.[i]?.weight?.type === "pattern"
                          ? "Only numbers are accepted."
                          : "Please check your input"}
                      </Box>
                    )}
                  </FormControl>
                  <Divider display={["block", "none"]} />
                </Stack>
              ))}

              <Stack
                direction={["column", "column", "row", "row"]}
                justifyContent="space"
                alignContent="center"
                display="flex"
              >
                <Stack direction="row" w={["100%"]}>
                  <Button
                    onClick={() => {
                      setEntryCount(entryCount + 1);
                    }}
                    colorScheme="pink"
                    variant="outline"
                    w="100%"
                  >
                    +
                  </Button>
                  {entryCount !== 1 && (
                    <Confirmation
                      title="-"
                      action={confirmationCallback}
                      variant="outline"
                      colorScheme="cyan"
                      w="100%"
                    />
                  )}
                </Stack>

                <Box w="100%">
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
                </Box>
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
                        mx={["0", "0"]}
                        defaultIsChecked
                      >
                        Update Profile
                      </Checkbox>
                    )}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Box display="flex">
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Submitting"
                type="submit"
                mx="auto"
                mt="4"
                w={["100%", "50%"]}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateWeights;
