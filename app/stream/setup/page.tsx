"use client";

import {
  Button,
  Container,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const StreamSetup = () => {
  const [chat, setChat] = useState("yes");
  const [sendMessage, setSendMessage] = useState("anyone");
  const [visibility, setVisibility] = useState("public");

  const { push } = useRouter();

  const searchParams = useSearchParams();

  const streamId = searchParams.get("stream");

  return (
    <Stack px={7} mt={3} pos="relative">
      <IconButton
        aria-label="Back"
        rounded="full"
        variant="ghost"
        colorScheme="gray"
        icon={<FaLongArrowAltLeft />}
        onClick={() => history.back()}
        pos="absolute"
        zIndex={99}
        left={7}
      />

      <Container maxW="container.md">
        <Stack
          w="full"
          h="full"
          bg="232222"
          pb={16}
          px={16}
          pt={10}
          spacing={14}
        >
          <Text fontWeight={600} fontSize="lg">
            Stream Setup
          </Text>

          <HStack spacing={3}>
            <Text fontWeight={500}>Stream Name:</Text>
            <Text
              borderBottom="2px solid #FFFFFF"
              // w={stream ? "fit-content" : "40"}
              alignSelf="flex-end"
            >
              {/* {stream?.stream_name} */} Hello World
            </Text>
          </HStack>

          <Stack spacing={7}>
            <HStack spacing={7}>
              <Text fontWeight={500}>Live Chat:</Text>
              <RadioGroup onChange={setChat} value={chat}>
                <HStack spacing={4}>
                  <Radio value="yes" colorScheme="step">
                    Yes
                  </Radio>
                  <Radio value="no" colorScheme="step">
                    No
                  </Radio>
                </HStack>
              </RadioGroup>
            </HStack>

            <Stack>
              <Text fontStyle="italic">Who can send message</Text>
              <RadioGroup onChange={setSendMessage} value={sendMessage}>
                <HStack spacing={4}>
                  <Radio value="anyone" colorScheme="step">
                    Anyone
                  </Radio>
                  <Radio value="followers" colorScheme="step">
                    Followers
                  </Radio>
                </HStack>
              </RadioGroup>
            </Stack>

            <Stack spacing={5}>
              <HStack spacing={7}>
                <Text fontWeight={500}>Visibility:</Text>
                <RadioGroup onChange={setVisibility} value={visibility}>
                  <HStack spacing={4}>
                    <Radio value="public" colorScheme="step">
                      Public
                    </Radio>
                    <Radio value="private" colorScheme="step">
                      Private
                    </Radio>
                  </HStack>
                </RadioGroup>
              </HStack>
            </Stack>
          </Stack>

          <Button
            w="fit-content"
            mx="auto"
            bg="#F9F9F9"
            _hover={{
              bg: "#F9F9F9",
            }}
            //   onClick={() => push(`/live/stream?stream_auth_id=${stream?.id}`)}
          >
            Start Stream
          </Button>
        </Stack>
      </Container>
      {/* {isLoading && (
          <Center h="30vh" w="full">
            <Spinner size="lg" />
          </Center>
        )} */}
    </Stack>
  );
};

const StreamSetupPage = () => {
  return (
    <Suspense>
      <StreamSetup />
    </Suspense>
  );
};

export default StreamSetupPage;
