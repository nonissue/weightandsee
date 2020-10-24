import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Fade,
  SlideFade,
  useDisclosure,
  ButtonProps
} from "@chakra-ui/core";

type Props = {
  title: string;
  action: () => void;
  description?: string;
};

export const Confirmation: React.FunctionComponent<Props & ButtonProps> = ({
  title,
  action,
  description,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} {...props}>
        {title}
      </Button>
      <Fade timeout={300} in={isOpen}>
        {styles => (
          <AlertDialog
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={true}
            isCentered
          >
            <AlertDialogOverlay style={styles}>
              <SlideFade timeout={500} in={isOpen} unmountOnExit={false}>
                {styles => (
                  <AlertDialogContent
                    style={styles}
                    width={["95%", "100%"]}
                    borderRadius={5}
                  >
                    <AlertDialogHeader mb="2" borderTopRadius={5}>
                      Warning
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      {description
                        ? description
                        : "Are you sure you want to remove an entry?"}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          action();
                          onClose();
                        }}
                        colorScheme="orange"
                        ml={3}
                      >
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </SlideFade>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Fade>
    </>
  );
};
