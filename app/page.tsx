"use client";

import React from "react";
import { Stack, Text, Button, Box, useDisclosure } from "@chakra-ui/react";
import { BsCameraReelsFill } from "react-icons/bs";
import GoLiveModal from "@/components/go-live-modal";
import StreamCard from "@/components/stream-card";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //  const {  data, isLoading } = useQuery({
  //    queryKey: ["live-page-streams"],
  //    queryFn: () => _getStreams(page),
  //    onSuccess: (data) => {
  //      setStreams((prev) => [...prev, ...data.data.data]);
  //      setPage((prev) => prev + 1);
  //    },
  //    refetchOnWindowFocus: false,
  //    refetchInterval: false,
  //  });

  return (
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
        onClick={onOpen}
      >
        Go Live
      </Button>

      <GoLiveModal onClose={onClose} isOpen={isOpen} />

      <Stack px={7} spacing={3} h="full">
        {/* {streams.length > 0 && (
          <Grid
            w="full"
            rowGap={7}
            columnGap={5}
            templateColumns="repeat(4, 1fr)"
          >
            {streams.map((stream, index) => (
              <GridItem key={stream.id}>
                <StreamCard stream={stream} />
              </GridItem>
            ))}
          </Grid>
        )} */}

        {/* {loading && (
          <Center py={10}>
            <Spinner color="primary.600" />
          </Center>
        )} */}

        {/* {!loading && !hasMore && (
          <Center py={10}>
            <Text textAlign="center" fontWeight="semibold">
              No more streams.
            </Text>
          </Center>
        )} */}
      </Stack>
    </Stack>
  );
}
