// componentize some of this

import { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
// eslint-disable-next-line import/no-named-as-default
import Router from "next/router";
import { PrismaClient } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";

import {
  Grid,
  Box,
  Input,
  Button,
  Stack,
  Select,
  Divider,
  FormControl,
  Checkbox,
  Flex,
} from "@chakra-ui/core";

import { Confirmation, Layout } from "../../components";

import { Participants, FormInputs, FormResult } from "../../interfaces";

const prisma = new PrismaClient();

type Person = {
  id: number;
  name: string;
  nickName: string;
};

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, (_, k) => k + 1);
}

// When form submitted, verify that no entries duplicated
export const getStaticProps: GetStaticProps = async () => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { handleSubmit, errors, control } = useForm<FormInputs>();
  const startDate = new Date();
  const [entryCount, setEntryCount] = useState(1);

  const confirmationCallback = () => {
    setEntryCount(entryCount - 1);
  };

  const onSubmit = async (data: FormResult) => {
    try {
      const res = await fetch(`/api/weigh-ins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(res);
      await Router.push("/weights");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {createArrayWithNumbers(entryCount).map((i) => (
                <Stack key={i} direction={["column", "row"]}>
                  <Stack w="100%">
                    <Box w="100%">
                      <FormControl id="person">
                        <Controller
                          name={`entries.[${i}].name`}
                          as={Select}
                          control={control}
                          placeholder="Select Person"
                          defaultValue=""
                          isInvalid={errors.entries?.[i]?.name ? true : false}
                          errorBorderColor="red.300"
                          rules={{ required: true }}
                        >
                          {people.map((p: Person) => {
                            return (
                              <option key={p.id} value={p.name}>
                                {p.name}
                              </option>
                            );
                          })}
                        </Controller>
                      </FormControl>
                    </Box>
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
                  </Stack>
                  <Box w="100%">
                    <Stack w="100%">
                      <FormControl id="person">
                        <Controller
                          name={`entries.[${i}].weight`}
                          control={control}
                          as={Input}
                          placeholder="Weight (lbs)"
                          defaultValue=""
                          isInvalid={errors.entries?.[i]?.weight ? true : false}
                          rules={{ required: true, min: 2 }}
                        />
                        {errors.entries?.[i]?.weight && false && (
                          <Box
                            fontFamily="mono"
                            fontSize="xs"
                            textColor="red.400"
                            pl="1"
                          >
                            Required
                          </Box>
                        )}
                      </FormControl>
                    </Stack>
                  </Box>
                  <Divider display={["block", "none"]} />
                </Stack>
              ))}

              <Stack direction={["column", "row"]}>
                <Stack direction="row">
                  <Button
                    onClick={() => {
                      setEntryCount(entryCount + 1);
                    }}
                    colorScheme="blue"
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
                      colorScheme="orange"
                      w="100%"
                    />
                  )}
                </Stack>

                <Box w="100%">
                  <Stack w="100%">
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
                  </Stack>
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

                <Box w="100%">
                  <Button colorScheme="blue" type="submit" w="100%">
                    Submit
                  </Button>
                </Box>
              </Stack>
              <FormControl
                as={Flex}
                justifyContent="flex-start"
                alignItems="center"
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
                      Update Current Weight(s)
                    </Checkbox>
                  )}
                />
              </FormControl>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateWeights;
