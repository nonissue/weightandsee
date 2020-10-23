import { Box, BoxProps } from "@chakra-ui/core";
import * as React from "react";
import { FormEventHandler } from "react";
import ReactDatePicker from "react-datepicker";

interface Props {
  selectedDate: Date;
  handleChange: (date: Date) => void;
  // handleChange: any;
}

export const DatePicker: React.FunctionComponent<Props> = ({
  selectedDate,
  handleChange,
  ...props
}: Props & BoxProps & any) => {
  return (
    <Box fontFamily="mono" w="100%">
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        showPopperArrow={false}
        {...props}
      />
    </Box>
  );
};
