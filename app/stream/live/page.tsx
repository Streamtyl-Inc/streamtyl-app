import { useRouter } from "next/navigation";
import {
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Avatar,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import LivestreamVideoPlayer from "@/components/live-stream-player";
// import StreamLiveChat from "../../../components/Live/StreamLiveChat";
// import FriendList from "../../../components/Community/FriendList";
import { useQuery } from "@tanstack/react-query";
// import { _getPlayback, _getStream } from "../../../lib/api/live.api";
// import LivestreamVideoPlayer from "../../../components/LivestreamVideoPlayer";

const LiveStream = () => {
  //   const { isLoading, data: stream } = useQuery({
  //     queryKey: ["stream-auth-details", query?.stream_auth_id],
  //     queryFn: () => _getStream(query.stream_auth_id as string),
  //     enabled: !!query.stream_auth_id,
  //   });

  return (
    <>
      <Stack px={7} spacing={10}>
        {/* <LivestreamVideoPlayer
            streamKey={stream?.data.stream_key}
            streamId={stream?.data.stream_id}
            streamAuthId={query.stream_auth_id as string}
          /> */}

        <Stack spacing={3}>
          <Text fontWeight={500} fontSize="2xl" textTransform="capitalize">
            {/* {stream?.data.stream_name} */} Hello World
          </Text>

          <HStack alignItems="flex-start" spacing={3}>
            <Avatar
              // src={stream?.data.auth.profile.avatar?.url}
              // name={`${stream?.data.auth.profile.firstname} ${stream?.data.auth.profile.lastname}`}
              name="David Norue"
            />

            <Stack spacing={0}>
              {/* <Text color="#FFFFFFE5">{`${stream?.data.auth.profile.firstname} ${stream?.data.auth.profile.lastname}`}</Text> */}
              <Text color="#FFFFFFE5">David Norue</Text>

              <Text
                color="#ACACACE5"
                fontWeight="medium"
                fontSize="sm"
                lineHeight="short"
              >
                {/* @{stream?.data.auth.username} */} @dnor
              </Text>
            </Stack>
          </HStack>
        </Stack>

        <HStack alignItems="flex-start" spacing={4}>
          <Stack w="70%">
            {/* <StreamLiveChat id={stream?.data.id as string} /> */}
          </Stack>

          <Stack
            w="30%"
            bg={"whiteAlpha.100"}
            px={5}
            pt={2}
            pb={5}
            rounded="lg"
          >
            {/* <FriendList /> */}
          </Stack>
        </HStack>
      </Stack>
      {/* 
      {isLoading && (
        <Center w="full" h="50vh">
          <Spinner color="#C71F1F" />
        </Center>
      )} */}
    </>
  );
};

export default LiveStream;
