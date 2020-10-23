import { Grid, Box, Input, Button, Stack, Select } from "@chakra-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import { Layout } from "../../components/Layout";
import { DatePicker } from "../../components/DatePicker";
// import { NextChakraLink } from "../../components/NextChakraLink";
import { Post, Posts } from "../../interfaces";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const posts: React.FunctionComponent<Posts> = () => {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  // const onSubmit = ({ data }: { [x: string]: string }) => console.log(data);
  const onSubmit = (data: any) => console.log(data);

  const [startDate, setStartDate] = useState(new Date());
  const [inputCount, setInputCount] = useState([1]);

  const [people, setPeople] = useState(["Al", "Cheese", "Boich"]);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* register your input into the hook by invoking the "register" function */}

              {inputCount.map(i => (
                <Stack key={i} direction={["column", "row"]}>
                  <Box key={i} w="100%">
                    <Select
                      name="gender"
                      ref={register}
                      onBlur={() => console.log("on blur")}
                      onChange={e =>
                        setPeople(
                          people.filter(person => person !== e.target.value)
                        )
                      }
                    >
                      {people.map(p => {
                        console.log(p);
                        return (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box w="100%">
                    <Input name="weight" placeholder="Weight" ref={register} />
                  </Box>
                </Stack>
              ))}
              <Button
                onClick={() => {
                  setInputCount([
                    ...inputCount,
                    inputCount[inputCount.length - 1] + 1
                  ]);
                }}
              >
                +
              </Button>

              {/* include validation with required or other standard HTML validation rules */}
              {/* <Input name="date" ref={register({ required: true })} /> */}
              <Stack direction={["column", "row"]}>
                <Box w="100%">
                  <DatePicker
                    handleChange={(date: Date) => {
                      setStartDate(date);
                      // console.log(startDate);
                    }}
                    selectedDate={startDate}
                  />
                </Box>
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
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
