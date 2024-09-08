import { HStack, Avatar, Stack, useDisclosure, Text } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import CreatePostModal from "../modal/create-post";
import { useUser } from "@/lib/hooks/user.hook";

const CreatePost = () => {
  const { user } = useUser();

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Stack
      bg={"whiteAlpha.100"}
      borderRadius="md"
      py={3}
      px={1}
      width="full"
      spacing={5}
    >
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
      <HStack spacing={3} px={3} cursor="pointer" onClick={onOpen}>
        <Avatar
          size="sm"
          src={user?.data.avatar?.url}
          name={`${user?.data.firstname} ${user?.data.lastname}`}
        />
        <Stack w="90%" px={3}>
          <Text fontSize="sm" color="gray">
            Post something...
          </Text>
        </Stack>
        <AiOutlineSend color="#C71F1F" fontSize={25} />
      </HStack>
    </Stack>
  );
};

export default CreatePost;
