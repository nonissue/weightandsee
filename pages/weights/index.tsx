import {
  Grid,
  Box,
  Input,
  Button,
  Stack,
  Select,
  Divider
} from "@chakra-ui/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import { Layout } from "../../components/Layout";
import ReactDatePicker from "react-datepicker";
// import { NextChakraLink } from "../../components/NextChakraLink";
import { Post, Posts } from "../../interfaces";

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
  const { register, handleSubmit, watch, errors, control } = useForm<Inputs>();

  // const onSubmit = ({ data }: { [x: string]: string }) => console.log(data);
  const onSubmit = (data: Result) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  const [startDate, setStartDate] = useState(new Date());
  const [entryCount, setEntryCount] = useState(1);
  const [people, setPeople] = useState(["Al", "Cheese", "Boich"]);

  // console.log(watch("example")); // watch input value by passing the name of it

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
                    <Box key={i} w="100%">
                      <Select
                        name={`entry.${i}.name`}
                        ref={register}
                        placeholder="Person..."
                      >
                        {people.map(p => {
                          return (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>
                    {errors.entry?.[i]?.weight && (
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
                      <Controller
                        name={`entry.${i}.weight`}
                        control={control}
                        as={Input}
                        placeholder="weight"
                        defaultValue=""
                        rules={{ required: true, min: 2 }}
                      />
                      {errors.entry?.[i]?.weight && (
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
                  </Box>
                  <Divider display={["block", "none"]} />
                  {i === entryCount && i !== 1 && false && (
                    // <Box w={"100%"}>
                    <Button
                      onClick={() => {
                        setEntryCount(entryCount - 1);
                      }}
                      colorScheme="orange"
                      variant="outline"
                    >
                      -
                    </Button>
                    // </Box>
                  )}
                </Stack>
              ))}

              {/* include validation with required or other standard HTML validation rules */}
              {/* <Input name="date" ref={register({ required: true })} /> */}
              <Stack direction={["column", "row"]}>
                <Button
                  onClick={() => {
                    setEntryCount(entryCount + 1);
                  }}
                  colorScheme="blue"
                  variant="outline"
                >
                  +
                </Button>

                {/* Confirm removal? */}
                {entryCount !== 1 && (
                  <Button
                    onClick={() => {
                      setEntryCount(entryCount - 1);
                    }}
                    colorScheme="orange"
                    variant="outline"
                  >
                    -
                  </Button>
                )}

                <Box w="100%">
                  <Controller
                    control={control}
                    name="date"
                    defaultValue={startDate}
                    // as={DatePicker}
                    render={({ onChange, onBlur, value }) => (
                      <ReactDatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Box>
                {errors.exampleRequired && <span>This field is required</span>}
                {errors.date && <span>This field is required</span>}
                {errors.weightRequired && <span>This field is required</span>}
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
