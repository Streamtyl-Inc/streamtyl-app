import { Livepeer } from "livepeer";
import { createReactClient, studioProvider } from "@livepeer/react";

export const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "b6aad7e2-f20b-4550-a209-59e9da8972fd",
  }),
});

export const livepeerService = new Livepeer({
  apiKey: "b6aad7e2-f20b-4550-a209-59e9da8972fd",
});
