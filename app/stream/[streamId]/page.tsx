"use client";

import { useEffect } from "react";
import {
  Avatar,
  Center,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import StreamPlayer from "@/components/stream-player";
import { Player } from "@livepeer/react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Session } from "livepeer/models/components";
import { usePlaybackInfo } from "@livepeer/react";
import { Spinner } from "@chakra-ui/react";
import StreamLiveChat from "@/components/stream-live-chat";
import FriendList from "@/components/friend-list";
import { QueryKeys } from "@/lib/constants/keys";
import { _getLivepeerRecordedStream, _getStream } from "@/lib/api/live.api";

type Props = {
  params: { streamId: string };
};

const Streams = ({ params: { streamId } }: Props) => {
  const { isLoading: streamLoading, data: stream } = useQuery({
    queryKey: [QueryKeys.GET_STREAMED_LIVE, streamId],
    queryFn: () => _getStream(streamId as string),
    enabled: !!streamId,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  const { data: playbackInfo } = usePlaybackInfo({
    playbackId: stream?.data.playback_id,
    refetchInterval: false,
    retry: 0,
  });

  const {
    mutate,
    isPending,
    data: recordedVideo,
  } = useMutation({
    mutationFn: _getLivepeerRecordedStream,
  });

  useEffect(() => {
    if (!isLoading && stream && stream.data) mutate(stream.data.id);
  }, [stream]);

  const videoDetails: Session[] = recordedVideo?.data ?? [];

  const isLoading = isPending || streamLoading;

  return (
    <>
      <Stack px={7} pt={4} spacing={6}>
        <IconButton
          aria-label="Back"
          rounded="full"
          w="fit-content"
          variant="ghost"
          colorScheme="gray"
          icon={<FaLongArrowAltLeft />}
          onClick={() => history.back()}
        />

        {!isLoading && stream && stream.data && (
          <Stack spacing={10}>
            <Stack>
              {playbackInfo?.meta.live ? (
                <Player title={stream?.data.stream_name} />
               ) : (
                 <StreamPlayer src={(videoDetails[0]?.mp4Url as string) ?? ""} />
              )}

              <Stack spacing={3}>
                <Text
                  fontWeight={500}
                  fontSize="2xl"
                  textTransform="capitalize"
                >
                  {stream?.data.stream_name}
                </Text>

                <HStack spacing={3}>
                  <Avatar
                    src={stream?.data.user.avatar?.url}
                    name={`${stream?.data.user.firstname} ${stream?.data.user.lastname}`}
                  />
                  <Text color="#FFFFFFE5">{`${stream.data.user.firstname} ${stream.data.user.lastname}`}</Text>
                </HStack>
              </Stack>
            </Stack>

            <HStack alignItems="flex-start" spacing={4}>
              <Stack w="70%">
                <StreamLiveChat id={stream.data.id} />
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
          <Center py={5} h="40vh">
            <Spinner color="#C71F1F" size="lg" />
          </Center>
        )}
      </Stack>
    </>
  );
};

export default Streams;
