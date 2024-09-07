"use client";

import { useState } from "react";
import {
  Stack,
  Text,
  Button,
  Box,
  useDisclosure,
  Center,
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BsCameraReelsFill } from "react-icons/bs";
import GoLiveModal from "@/components/go-live-modal";
import StreamCard from "@/components/stream-card";
import { useQuery } from "@tanstack/react-query";
import { _getStreams } from "@/lib/api/live.api";
import { QueryKeys } from "@/lib/constants/keys";

export default function Home() {
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: streams, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_STREAMS, page],
    queryFn: () => _getStreams(page),
  });

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
        {!isLoading &&
          streams &&
          streams.data &&
          streams.data.data &&
          streams.data.data.length > 0 && (
            <Grid
              w="full"
              rowGap={7}
              columnGap={5}
              templateColumns="repeat(4, 1fr)"
            >
              {streams.data.data.map((stream) => (
                <GridItem key={stream.id}>
                  <StreamCard stream={stream} />
                </GridItem>
              ))}
            </Grid>
          )}

        {isLoading && (
          <Center py={10}>
            <Spinner color="primary.600" />
          </Center>
        )}

        {!isLoading && streams?.data.data.length === 0 && (
          <Center py={10}>
            <Text textAlign="center" fontWeight="semibold">
              No streams yet.
            </Text>
          </Center>
        )}
      </Stack>
    </Stack>
  );
}
