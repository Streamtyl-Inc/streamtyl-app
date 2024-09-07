import { Box, Center, VStack } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import React, { ReactNode } from "react";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

const montserrat = Montserrat({ subsets: ["latin"] });

const AuthLayout = ({ children }: Props) => {
  return (
    <VStack
      h="100vh"
      className={`${montserrat.className} no-scrollbar`}
      as="main"
      w="full"
      overflowY="auto"
      alignItems="start"
      spacing={14}
    >
      <Box my={5} mx={5}>
        <Image
          src="/images/streamtyl-logo.svg"
          height={35}
          width={35}
          alt="streamtyl"
        />
      </Box>
      <Center width="full">{children}</Center>
    </VStack>
  );
};

export default AuthLayout;
