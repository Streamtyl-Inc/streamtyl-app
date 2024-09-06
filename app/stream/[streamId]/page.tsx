import { ReactElement, useContext } from "react";
import {
  Avatar,
  Center,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
// import { QueryKeys } from "../../../lib/constants/keys";
// import {
//   _getLivepeerRecordedStream,
//   _getStream,
//   _watchStream,
// } from "../../../lib/api/live.api";
import StreamPlayer from "@/components/stream-player";
import { Player } from "@livepeer/react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Session } from "livepeer/models/components";
import { usePlaybackInfo } from "@livepeer/react";
import { Spinner } from "@chakra-ui/react";
import StreamLiveChat from "@/components/stream-live-chat";
import FriendList from "@/components/friend-list";
import { MdVerified } from "react-icons/md";

type Props = {
  params: { streamId: string };
};

const Streams = ({ params: { streamId } }: Props) => {
  const { query } = useRouter();

  // const {
  //   mutate,
  //   isLoading: videoLoading,
  //   data: recordedVideo,
  // } = useMutation({
  //   mutationFn: _getLivepeerRecordedStream,
  // });

  // const { isLoading, data: stream } = useQuery({
  //   queryKey: [QueryKeys.GET_STREAMED_LIVE, query.stream],
  //   queryFn: () => _getStream(query.stream as string),
  //   onSuccess: async (data) => {
  //     mutate(data.data.stream_id);
  //   },
  //   enabled: !!query.stream,
  //   refetchOnWindowFocus: false,
  // });

  // const { data: playbackInfo } = usePlaybackInfo({
  //   playbackId: stream?.data.playback_id,
  //   refetchInterval: false,
  //   retry: 0,
  // });

  // const videoDetails: Session[] = recordedVideo?.data ?? [];

  // const loading = isLoading || videoLoading;

  // const watchStream = useQuery({
  //   queryKey: [QueryKeys.WATCH_STREAM, query.stream],
  //   queryFn: () => _watchStream(query.stream as string),
  //   retry: 0,
  //   refetchInterval: false,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchIntervalInBackground: false,
  //   refetchOnReconnect: false,
  //   enabled: !!query.stream && !!playbackInfo && playbackInfo.meta.live,
  // });

  return (
    <>
      <Stack px={7}>
        <IconButton
          aria-label="Back"
          rounded="full"
          w="fit-content"
          variant="ghost"
          colorScheme="gray"
          icon={<FaLongArrowAltLeft />}
          onClick={() => history.back()}
        />

        {/* {!loading && stream && (
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

                <Link href={`/${stream?.data.auth.username}`} passHref>
                  <HStack alignItems="flex-start" spacing={3}>
                    <Avatar
                      src={stream?.data.auth.profile.avatar?.url}
                      name={`${stream?.data.auth.profile.firstname} ${stream?.data.auth.profile.lastname}`}
                    />

                    <Stack spacing={0}>
                      <HStack spacing={2}>
                        <Text color="#FFFFFFE5">{`${stream?.data.auth.profile.firstname} ${stream?.data.auth.profile.lastname}`}</Text>
                        {verified && (
                          <MdVerified
                            color="#DB242D"
                            style={{ marginTop: -7 }}
                          />
                        )}
                      </HStack>

                      <Text
                        color="#ACACACE5"
                        fontWeight="medium"
                        fontSize="sm"
                        lineHeight="short"
                      >
                        @{stream?.data.auth.username}
                      </Text>
                    </Stack>
                  </HStack>
                </Link>
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
        )} */}
        {/* 
        {loading && (
          <Center py={5} h="40vh">
            <Spinner color="#C71F1F" size="lg" />
          </Center>
        )} */}
      </Stack>
    </>
  );
};

export default Streams;
