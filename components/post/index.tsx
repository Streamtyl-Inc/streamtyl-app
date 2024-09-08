import React, { useState, useContext } from "react";
import {
  HStack,
  Text,
  Avatar,
  VStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { _getPosts } from "../../lib/api/post.api";
import { PostData } from "../../lib/types/post.type";
import NextLink from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { useUser } from "@/lib/hooks/user.hook";

type Props = {
  post: PostData;
  page: number;
};

const Post = ({ post, page }: Props) => {
  const { user } = useUser();

  return (
    <>
      <VStack
        alignItems="flex-start"
        bg={"whiteAlpha.100"}
        borderRadius="md"
        w="full"
        py={5}
        spacing={4}
        key={post.id}
        position="relative"
      >
        <HStack
          justifyContent="space-between"
          w="full"
          alignItems="flex-start"
          px={4}
        >
          <HStack spacing={4}>
            <Avatar
              size="sm"
              src={post.user.avatar?.url}
              name={`${post.user.firstname} ${post.user.lastname}`}
            />
            <VStack alignItems="flex-start" spacing={0}>
              <Text
                fontSize="md"
                textTransform="capitalize"
              >{`${post.user.firstname} ${post.user.lastname}`}</Text>
            </VStack>
          </HStack>

          <HStack spacing={4}>
            <Text fontSize="xs" color="#D3D3D3">
              {formatDistanceToNowStrict(new Date(post.created_at))} ago
            </Text>
          </HStack>
        </HStack>

        <HStack fontSize="md" px={4}>
          <Text>{post.post_text}</Text>
        </HStack>
      </VStack>
    </>
  );
};

export default Post;
