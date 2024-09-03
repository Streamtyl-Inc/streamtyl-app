"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { LivepeerConfig } from "@livepeer/react";
import { livepeerClient } from "@/utils/livepeer-client";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <LivepeerConfig client={livepeerClient}>{children}</LivepeerConfig>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
