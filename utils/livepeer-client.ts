import { Livepeer } from "livepeer";
import { createReactClient, studioProvider } from "@livepeer/react";
var apiKey="bce412b1-9641-4983-8157-59d37c6b9dcd"
export const livepeerClient = createReactClient({
  provider: studioProvider({
    // apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!,
    apiKey:"bce412b1-9641-4983-8157-59d37c6b9dcd"
  }),
});

export const livepeerService = new Livepeer({
  apiKey:"bce412b1-9641-4983-8157-59d37c6b9dcd"
  
});
