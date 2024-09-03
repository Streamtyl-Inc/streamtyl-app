import { Livepeer } from "livepeer";
import { createReactClient, studioProvider } from "@livepeer/react";

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!,
  }),
});

export const livepeerService = new Livepeer({
  apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!,
});
