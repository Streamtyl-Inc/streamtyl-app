"use client";

import { useSearchParams } from "next/navigation";
import { Stack, Text, HStack, Avatar, Spinner, Center } from "@chakra-ui/react";
import LivestreamVideoPlayer from "@/components/live-stream-player";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
import { _getStream } from "@/lib/api/live.api";
import StreamLiveChat from "@/components/stream-live-chat";
import FriendList from "@/components/friend-list";
import { Suspense } from "react";

const LiveStream = () => {
  const searchParams = useSearchParams();

  const streamId = searchParams.get("streamId");

  const { isLoading, data: stream } = useQuery({
    queryKey: [QueryKeys.GET_STREAM_DETAILS, streamId],
    queryFn: () => _getStream(streamId as string),
    enabled: !!streamId,
  });

  return (
    <>
      {!isLoading && stream && stream.data && (
        <Stack px={7} spacing={10}>
          <LivestreamVideoPlayer
            streamKey={stream.data.stream_key}
            streamId={stream.data.stream_id}
            streamAuthId={streamId as string}
          />

          <Stack spacing={3}>
            <Text fontWeight={500} fontSize="2xl" textTransform="capitalize">
              {stream.data.stream_name}
            </Text>

            <HStack alignItems="flex-start" spacing={3}>
              <Avatar
                src={stream.data.auth.profile.avatar?.url}
                name={`${stream.data.auth.profile.firstname} ${stream.data.auth.profile.lastname}`}
              />

              <Stack spacing={0}>
                <Text color="#FFFFFFE5">{`${stream.data.auth.profile.firstname} ${stream.data.auth.profile.lastname}`}</Text>

                <Text
                  color="#ACACACE5"
                  fontWeight="medium"
                  fontSize="sm"
                  lineHeight="short"
                >
                  @{stream.data.auth.username}
                </Text>
              </Stack>
            </HStack>
          </Stack>

          <HStack alignItems="flex-start" spacing={4}>
            <Stack w="70%">
              <StreamLiveChat id={streamId as string} />
            </Stack>

            <Stack
              w="30%"
              bg={"whiteAlpha.100"}
              px={5}
              pt={2}
              pb={5}
              rounded="lg"
            >
              <FriendList />
            </Stack>
          </HStack>
        </Stack>
      )}

      {isLoading && (
        <Center w="full" h="50vh">
          <Spinner color="#C71F1F" />
        </Center>
      )}
    </>
  );
};

const LiveStreamPage = () => {
  return (
    <Suspense>
      <LiveStream />
    </Suspense>
  );
};

export default LiveStreamPage;
