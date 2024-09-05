"use client";

import React from "react";
import { Stack, Text, Button, Box, useDisclosure } from "@chakra-ui/react";
import { BsCameraReelsFill } from "react-icons/bs";
// import LivestreamTab from "../../components/Live/LivestreamTab";
// import GoLiveModal from "../../components/Live/GoLiveModal";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack
        w="full"
        my={8}
        pos="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign="center" fontSize="xl" fontWeight={600}>
          Livestreams
        </Text>

        <Button
          leftIcon={
            <Box bg="#211F1FCC" rounded="full" p={3}>
              <BsCameraReelsFill />
            </Box>
          }
          bg="primary.500"
          color="#fff"
          rounded="3xl"
          fontSize="sm"
          py={6}
          pl={3}
          pos="absolute"
          right={7}
          onClick={() => onOpen()}
        >
          Go Live
        </Button>

        {/* <GoLiveModal onClose={onClose} isOpen={isOpen} /> */}
      </Stack>
    </>
  );
}
