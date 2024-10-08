"use client";

import { useState } from "react";
import { VStack, Text, Center, Spinner, Stack } from "@chakra-ui/react";
import CreatePost from "@/components/create-post";
import Post from "@/components/post";
import { _getPosts } from "../../lib/api/post.api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../lib/constants/keys";

const Feeds = () => {
  const [page, setPage] = useState(1);

  const { data: postData, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_POSTS, page],
    queryFn: () => _getPosts(page),
    staleTime: 0,
    enabled: !!page,
  });

  return (
    <>
      <Stack my={8} spacing={6}>
        <Text textAlign="center" fontSize="xl" fontWeight={600}>
          Livestreams
        </Text>
        <Stack
          w="70%"
          mx="auto"
          h="fit-content"
          overflowY="auto"
          className="no-scrollbar"
          pb={10}
          px={7}
          spacing={5}
        >
          <CreatePost />
          <VStack spacing={5}>
            {!isLoading &&
              postData &&
              postData.data &&
              postData.data.data &&
              postData.data.data.length !== 0 &&
              postData.data.data.map((post) => (
                <Post post={post} key={post.id} page={page} />
              ))}

            {!isLoading &&
              postData &&
              postData.data &&
              postData.data.data &&
              postData.data.data.length === 0 && (
                <Center>
                  <Text fontWeight="semibold" py={3}>
                    You don&apos;t have any post
                  </Text>
                </Center>
              )}

            {isLoading && (
              <Center my={5}>
                <Spinner color="primary.500" thickness="3px" />
              </Center>
            )}
          </VStack>
        </Stack>
      </Stack>
    </>
  );
};

export default Feeds;
