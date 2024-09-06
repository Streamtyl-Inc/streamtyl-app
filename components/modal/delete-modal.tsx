import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _deletePost } from "@/lib/api/post.api";
import { QueryKeys } from "@/lib/constants/keys";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
};

const DeleteModal = ({ isOpen, onClose, postId }: Props) => {
  const bgColor = useColorModeValue("#EEECEC", "#262323");
  const textColor = useColorModeValue("black", "white");

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: _deletePost,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_POSTS] });
    },
  });

  const handleDelete = () => {
    mutate(postId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <VStack spacing={5} p={5}>
          <Text fontSize="md" color={textColor}>
            Are you sure you want to delete this post?
          </Text>
          <HStack gap={3}>
            <Button colorScheme="gray" size="lg" onClick={() => onClose()}>
              No
            </Button>
            <Button
              bg="primary.500"
              color="white"
              size="lg"
              onClick={handleDelete}
              isLoading={isPending}
            >
              Yes
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
