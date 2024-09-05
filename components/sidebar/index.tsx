"use client";

import {
  IconButton,
  Stack,
  useDisclosure,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import NextLink from "next/link";
import { HiUsers } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const sidebarlinks = [
    {
      id: nanoid(),
      name: "Home",
      label: "home",
      href: "/",
      icon: <IoMdHome size={25} />,
    },
    {
      id: nanoid(),
      name: "Socials",
      label: "socials",
      href: "/socials",
      icon: <HiUsers size={25} />,
    },
  ];

  return (
    <VStack
      as="aside"
      paddingTop={8}
      paddingBottom={5}
      hidden={pathname.includes("auth")}
      px={5}
      justifyContent="space-between"
      alignItems="center"
      height="100vh"
      rounded="2xl"
      overflowY="auto"
      className="sidebar-bg no-scrollbar"
      transition="width ease-in-out 200ms"
      bg="#141414"
    >
      <Stack spacing={10} w="full">
        <Stack w="full">
          <Image
            src="/images/streamtyl-logo.svg"
            height={35}
            width={35}
            alt="streamtyl"
          />
        </Stack>

        <Stack as="nav" spacing={3}>
          {sidebarlinks.map((link) => (
            <NextLink passHref href={link.href} key={link.id}>
              <Tooltip hasArrow label={link.name}>
                <IconButton
                  icon={link.icon}
                  variant="ghost"
                  w="full"
                  alignItems="center"
                  gap={2}
                  color={
                    pathname.includes("/")
                      ? pathname.includes("/stream")
                        ? "#C71F1F"
                        : pathname === link.href
                        ? "#C71F1F"
                        : ""
                      : "#C71F1F"
                  }
                  className={
                    !pathname.includes(link.href) ? "sidebar-icon-color" : ""
                  }
                  _hover={{
                    bg: "none",
                    color: "#C71F1F",
                    transition: "all ease-out 300ms",
                  }}
                  aria-label={link.name}
                />
              </Tooltip>
            </NextLink>
          ))}
        </Stack>
      </Stack>

      <Stack w="full" spacing={5} pt={7}>
        <Tooltip hasArrow label="Logout">
          <IconButton
            icon={<RiLogoutBoxRLine size={25} className="logout-icon" />}
            variant="ghost"
            w="full"
            alignItems="center"
            gap={2}
            color="#ebebf5"
            _hover={{
              bg: "none",
              color: "#C71F1F",
              transition: "all ease-out 300ms",
            }}
            aria-label="logout"
          />
        </Tooltip>
      </Stack>

      {/* <LogoutModal isOpen={isOpen} onClose={onClose} /> */}
    </VStack>
  );
};

export default SideBar;
