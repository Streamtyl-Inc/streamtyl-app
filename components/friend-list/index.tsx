import React from "react";
import { Text, HStack, Stack, Avatar, Circle } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FriendList = () => {
  return (
    <Stack w="full" spacing={5} pt={5}>
      <HStack w="full" justifyContent="space-between">
        <Text>Friends</Text>
        <BsThreeDotsVertical cursor="pointer" />
      </HStack>

      <Stack spacing={4}>
        <HStack w="full" justifyContent="space-between">
          <HStack spacing={5}>
            <Avatar src="images/freetyl-user.jpg" name="John Doe" />
            <Stack spacing={0.5}>
              <Text fontSize="sm">Annette Black</Text>
              <Text fontSize="xs" color="rgba(82, 81, 81, 1)">
                Online
              </Text>
            </Stack>
          </HStack>

          <Circle bg="#69C30F" size="9px"></Circle>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default FriendList;
