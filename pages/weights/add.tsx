// https://spectrum.chat/react-hook-form/help/usefieldarray-append-remove-clearing-form-data~37c65e57-411e-489b-a4dd-2f0df7277954
// https://codesandbox.io/s/react-hook-form-usefieldarray-vy8fv?from-embed
// https://github.com/react-hook-form/react-hook-form/issues/398

// Error handling: https://github.com/react-hook-form/react-hook-form/blob/master/examples/FieldArray.tsx
// https://github.com/react-hook-form/react-hook-form/issues/1617

// https://github.com/react-hook-form/react-hook-form/issues/978 -> Original solution

// (PRETTY CLEAN TBH) simple form with add / remove https://codesandbox.io/s/6j1760jkjk
// Proper json stringify: https://codesandbox.io/s/react-hook-form-v6-controller-append-prepepend-insert-7clz7?file=/src/index.js

// Datepicker: https://codesandbox.io/s/react-hook-form-controller-079xx?file=/src/index.js

// Oh man, Chakra isRequired is way better than relying on form errors
import { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { PrismaClient } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Grid,
  Box,
  Input,
  Button,
  Stack,
  Select,
  Divider,
  FormControl
} from "@chakra-ui/core";

import { Layout } from "../../components/Layout";

import { Confirmation } from "../../components/Confirmation";
import { Participants, FormInputs, FormResult } from "../../interfaces";

const prisma = new PrismaClient();

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, (_, k) => k + 1);
}

// When form submitted, verify that no entries duplicated

export const getServerSideProps: GetServerSideProps = async () => {
  const people = await prisma.person.findMany({
    // select: { name: true, nickName: true },
    select: {
      id: true,
      name: true,
      nickName: true
    },
    orderBy: { createdAt: "asc" }
  });

  return {
    props: { people }
  };
};

const CreateWeights: React.FunctionComponent<Participants> = ({ people }) => {
  const { handleSubmit, errors, control } = useForm<FormInputs>();
  const startDate = new Date();
  const [entryCount, setEntryCount] = useState(1);

  const confirmationCallback = () => {
    setEntryCount(entryCount - 1);
  };

  const onSubmit = async (data: FormResult) => {
    console.log(data);
    const strDate = data.date.toLocaleDateString();
    console.log(strDate);
    console.log(typeof strDate);

    // const parsedData = {
    //   ...data,
    //   date: strDate
    // };

    // const stringifyDate = {
    //   date: data.date.toISOString().split("T")[0],
    //   ...data
    // };

    // data.date = data.date.toISOString().split("T")[0];
    // console.log(JSON.stringify(data.entries));
    // console.log(data.entries?.length);
    //     data.entries.map(e =>
    //       alert(
    //         `${JSON.stringify(data.date.toISOString().split("T")[0])}
    // ${e.name} / ${e.weight} lbs`
    //       )
    //     );
    try {
      const res = await fetch(`/api/weigh-ins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      console.log(res);
      await Router.push("/weights");
    } catch (e) {
      console.log(e);
    }

    //     alert(
    //       `${JSON.stringify(data.date.toISOString().split("T")[0])}
    // ${data.entry[1].name} / ${data.entry[1].weight}lbs`
    //     );
    // try {
    // Might have to move this to an api call?
    // https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/post/index.ts
    // const weighIn = await prisma.weighIn.create({
    //   data: {
    //     weight: data.entry[1].weight,
    //     weighDate: data.date.toISOString().split("T")[0],
    //     person: {
    //       connect: { nickName: "Cheese" }
    //     }
    //   }
    // });
    //   // console.log(weighIn);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  // const [startDate, setStartDate] = useState(new Date());

  // console.log(watch("entry")); // watch input value by passing the name of it

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {createArrayWithNumbers(entryCount).map(i => (
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
                          {people.map(p => {
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

              {/* include validation with required or other standard HTML validation rules */}
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
                          onChange={onChange}
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
                  <Button colorScheme="green" type="submit" w="100%">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateWeights;
