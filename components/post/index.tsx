import React, { useState, useContext } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Avatar,
  VStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  Collapse,
  useDisclosure,
  Center,
  Stack,
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BsThreeDotsVertical, BsPin } from "react-icons/bs";
import { BiCommentDetail, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import { TiEdit } from "react-icons/ti";
import { MdOutlineContentCopy } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { _getPosts } from "../../lib/api/post.api";
import { PostData } from "../../lib/types/post.type";
import { NumberFormatter, checkTimeWindow } from "../../lib/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IsString, MinLength } from "class-validator";
import {
  _postComment,
  _getPostComments,
  _deletePost,
  _likePost,
  _unlikePost,
  _verifyLike,
} from "../../lib/api/post.api";
import NextLink from "next/link";
import DeleteModal from "../modal/delete-modal";
import { formatDistanceToNowStrict } from "date-fns";
import { useAuthUser } from "@/lib/hooks/auth-user.hook";

type Props = {
  post: PostData;
  page: number;
};

const Post = ({ post, page }: Props) => {
  const { user } = useAuthUser();

  const {
    isOpen: deleteModal,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  return (
    <>
      <VStack
        alignItems="flex-start"
        bg={"whiteAlpha.100"}
        borderRadius="md"
        w="full"
        pt={4}
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
          <NextLink href={`/${post.auth.username}`} passHref>
            <HStack spacing={4}>
              <Avatar
                size="sm"
                src={post.auth.profile.avatar?.url}
                name={`${post.auth.profile.firstname} ${post.auth.profile.lastname}`}
              />
              <VStack alignItems="flex-start" spacing={0}>
                <Text
                  fontSize="md"
                  textTransform="capitalize"
                >{`${post.auth.profile.firstname} ${post.auth.profile.lastname}`}</Text>
                <Text fontSize="xs" color="#ACACAC">
                  {`@${post.auth.username}`}
                </Text>
              </VStack>
            </HStack>
          </NextLink>

          <HStack spacing={4}>
            <Text fontSize="xs" color="#D3D3D3">
              {formatDistanceToNowStrict(new Date(post.created_at))} ago
            </Text>

            <Menu>
              <MenuButton>
                <BsThreeDotsVertical />
              </MenuButton>
              <MenuList bg="#111010" fontSize="xs" color="#D3D3D3">
                {post.auth.id === user?.data.id && (
                  <>
                    <MenuItem bg="inherit" onClick={openDeleteModal}>
                      <HStack gap={2} color="inherit" fontWeight="medium">
                        <TbTrash />
                        <Text color="inherit">Delete Post</Text>
                      </HStack>
                    </MenuItem>
                  </>
                )}
                <MenuItem bg="inherit">
                  <HStack gap={2} color="inherit" fontWeight="medium">
                    <MdOutlineContentCopy />
                    <Text color="inherit">Copy link</Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <HStack fontSize="md" px={4}>
          <Text>{post.post_text}</Text>
        </HStack>

        {post.media?.length > 0 && (
          <Grid
            templateColumns={post.media?.length > 1 ? "50% 1fr" : "100% 1fr"}
            w="full"
            gridGap={2}
            px={4}
          >
            {post.media?.map((image, i) => (
              <GridItem key={i}>
                <Image
                  alt={image.bucket}
                  src={image.url}
                  w="full"
                  h={post.media?.length > 1 ? "300px" : "fit-content"}
                  minH="300px"
                  maxH="500px"
                  objectFit="cover"
                  objectPosition="center"
                  rounded="lg"
                  loading="lazy"
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>

      {/* Modals */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        postId={post.id}
        page={page}
      />
    </>
  );
};

export default Post;
