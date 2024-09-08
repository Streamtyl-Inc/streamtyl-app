import {
  Stack,
  Text,
  HStack,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { HiSignal } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { UserStream } from "@/lib/types/stream.type";
import Link from "next/link";
import { usePlaybackInfo } from "@livepeer/react";
import { NumberFormatter } from "../../lib/utils";

type Props = {
  stream: UserStream;
};

const StreamCard = ({ stream }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: playbackInfo } = usePlaybackInfo({
    playbackId: stream?.playback_id,
    retry: 0,
  });

  const tipUser = async () => {
    onOpen();
    // await tip("investor5.testnet", "1000000000");
  };

  return (
    <Stack spacing={4}>
      <Link href={`/stream/${stream?.id}`} passHref>
        <Stack position="relative" h="200px" overflow="hidden">
          <Stack
            h="full"
            w="full"
            bgImage={`url(${stream.thumbnail.url})`}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgColor="inherit"
            bgPos="center"
            rounded="lg"
          />

          <HStack
            py={2}
            pl={3}
            pr={5}
            bg="#575757E5"
            color="#fff"
            w="fit-content"
            spacing={2}
            roundedRight="md"
            position="absolute"
            left={0}
            top={2}
          >
            <ViewIcon fontSize={23} />
            <Text fontWeight="medium">
              {NumberFormatter.format(Number(stream.watch_count))}
            </Text>
          </HStack>

          {playbackInfo?.meta.live && (
            <Button
              color="white"
              size="sm"
              rightIcon={<HiSignal />}
              bg="primary.500"
              rounded="lg"
              position="absolute"
              bottom={2}
              right={2}
            >
              Live
            </Button>
          )}
        </Stack>
      </Link>

      <HStack justifyContent="space-between" alignItems="flex-start">
        <HStack alignItems="flex-start" spacing={3}>
          <Avatar
            src={stream.user.avatar?.url}
            name={`${stream.user.firstname} ${stream.user.lastname}`}
          />
          <Stack spacing={0.5}>
            <Text>{`${stream.user.firstname} ${stream.user.lastname}`}</Text>

            <Text
              fontWeight="medium"
              fontSize="sm"
              lineHeight="short"
              textTransform="capitalize"
            >
              {stream.stream_name}
            </Text>
          </Stack>
        </HStack>

        <Menu>
          <MenuButton>
            <IconButton
              icon={<BsThreeDotsVertical />}
              aria-label="options"
              rounded="full"
              colorScheme="gray"
              bg="inherit"
            />
          </MenuButton>

          <MenuList bg="#111010" fontSize="xs" color="#D3D3D3">
            <MenuItem bg="inherit" onClick={tipUser}>
              <HStack gap={2.5} color="inherit" fontWeight="medium">
                <IoWalletOutline />
                <Text color="inherit">Tip</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Stack>
  );
};

export default StreamCard;
