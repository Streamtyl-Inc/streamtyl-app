import {
  Avatar,
  HStack,
  Stack,
  Text,
  Center,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { _getStreamComments } from "@/lib/api/live.api";
import Link from "next/link";
import { StreamComment } from "@/lib/types/stream.type";
import CreateComment from "../create-comment";
import { QueryKeys } from "@/lib/constants/keys";

type Props = {
  id: string;
};

const StreamLiveChat = ({ id }: Props) => {
  const [comments, setComments] = useState<StreamComment[]>([]);

  const commentScroll = useRef<HTMLDivElement | null>(null);
  const goToComment = () => {
    if (commentScroll.current) {
      commentScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUniqueComments = (newComments: StreamComment[]) => {
    setComments((prevComments) => {
      const uniqueComments = new Map<string, StreamComment>();

      [...prevComments, ...newComments].forEach((c) => {
        uniqueComments.set(c.id, c);
      });

      return Array.from(uniqueComments.values());
    });
  };

  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.GET_STREAM_CHATS, id],
    queryFn: () => _getStreamComments(id),
    enabled: !!id,
  });

  useLayoutEffect(() => {
    if (comments.length > 0) goToComment();
  }, [comments]);

  useEffect(() => {
    if (!isLoading && data && data.data && data.data.data)
      handleUniqueComments([...data.data.data].reverse());
  }, [data]);

  return (
    <Stack w="full" bg="#141414" px={5} pt={6} pb={5} spacing={0}>
      <Text fontSize="xl" fontWeight={500} pb={7}>
        Live Chat
      </Text>

      {/* comments */}
      <Stack pos="relative">
        <Stack
          pos="absolute"
          py={
            comments.length === 0
              ? 0
              : Number(comments?.length) === 1
              ? 0
              : Number(comments?.length) >= 2 && Number(comments?.length) <= 3
              ? 2
              : 7
          }
          top={0}
          bgGradient="linear(to-b, rgba(20,20,20), rgba(20,20,20,.4))"
          w="full"
        ></Stack>

        <Stack
          h={Number(comments?.length) === 0 ? "100px" : "250px"}
          overflowY="auto"
          className="no-scrollbar"
          spacing={6}
        >
          {!isLoading &&
            comments.length > 0 &&
            comments.map((comment, index) => (
              <HStack spacing={3} key={comment.id}>
                <Link href={`/${comment.user.username}`} passHref>
                  <Avatar
                    src={comment.user.avatar?.url}
                    name={`${comment.user.firstname} ${comment.user.lastname}`}
                    size="sm"
                  />
                </Link>

                <Stack spacing={0.4}>
                  <Link href={`/${comment.user.username}`} passHref>
                    <Text color="#8D8A8AE5" fontSize="sm" fontWeight={500}>
                      {`${comment.user.firstname} ${comment.user.lastname}`}
                    </Text>
                  </Link>

                  <Text fontWeight={500}>{comment.comment_text}</Text>
                </Stack>
              </HStack>
            ))}

          <div
            ref={commentScroll}
            style={{
              paddingBlock: 0,
              marginBlock: 0,
              height: "0px",
            }}
          />

          {!isLoading && comments?.length === 0 && (
            <Text textAlign="center">No Comments.</Text>
          )}

          {isLoading && (
            <Center py={5}>
              <Spinner color="#C71F1F" />
            </Center>
          )}
        </Stack>
      </Stack>

      {/* create_comment */}
      <CreateComment id={id as string} scrollToComment={goToComment} />
    </Stack>
  );
};

export default StreamLiveChat;
