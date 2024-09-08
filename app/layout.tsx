import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { HStack, Stack } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamtyl",
  icons: {
    icon: [
      {
        url: "/images/streamtyl-logo.svg",
        href: "/images/streamtyl-logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <HStack alignItems="flex-start" w="full" justifyContent="flex-start">
            <Stack w="fit-content">
              <SideBar />
            </Stack>
            <Stack
              as="main"
              w="full"
              h="100vh"
              overflowY="auto"
              className="no-scrollbar"
              pb={10}
            >
              {children}
            </Stack>
          </HStack>
        </Providers>
      </body>
    </html>
  );
}
