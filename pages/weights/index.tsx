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
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import { Layout } from "../../components/Layout";
import { Confirmation } from "../../components/Confirmation";
import ReactDatePicker from "react-datepicker";
// import { NextChakraLink } from "../../components/NextChakraLink";
import { Posts } from "../../interfaces";

type Inputs = {
  example: string;
  date: Date;
  exampleRequired: string;
  weightRequired: string;
  entry: {
    [k: number]: {
      weight: string;
      name: string;
    };
  };
};

type Result = {
  date: Date;
  entry: {
    [k: string]: {
      weight: string;
      name: string;
    };
  };
};

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, (_, k) => k + 1);
}

// When form submitted, verify that no entries duplicated

const posts: React.FunctionComponent<Posts> = () => {
  const { handleSubmit, errors, control } = useForm<Inputs>();

  const onSubmit = (data: Result) => {
    console.log(data);
    console.log(data.entry);
    alert(JSON.stringify(data));
  };

  // const [startDate, setStartDate] = useState(new Date());
  const startDate = new Date();
  const [entryCount, setEntryCount] = useState(1);
  // const [people, setPeople] = useState(["Al", "Cheese", "Boich"]);
  const people = ["Al", "Cheese", "Boich"];

  const confirmationCallback = () => {
    setEntryCount(entryCount - 1);
  };

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
                        {/* <FormLabel>Person</FormLabel> */}
                        <Controller
                          name={`entry.${i}.name`}
                          as={Select}
                          control={control}
                          placeholder="Select Person"
                          defaultValue=""
                          isInvalid={errors.entry?.[i]?.name ? true : false}
                          errorBorderColor="red.300"
                          rules={{ required: true }}
                        >
                          {people.map(p => {
                            return (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            );
                          })}
                        </Controller>
                      </FormControl>
                    </Box>
                    {errors.entry?.[i]?.name && false && (
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
                          name={`entry.${i}.weight`}
                          control={control}
                          as={Input}
                          placeholder="Weight (lbs)"
                          defaultValue=""
                          isInvalid={errors.entry?.[i]?.weight ? true : false}
                          rules={{ required: true, min: 2 }}
                        />
                        {errors.entry?.[i]?.weight && false && (
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

                  {/* Confirm removal? */}

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

export default posts;
