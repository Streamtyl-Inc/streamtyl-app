"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Stack, Text, HStack, Avatar, Spinner, Center ,Button} from "@chakra-ui/react";
import LivestreamVideoPlayer from "@/components/live-stream-player";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
import { _getStream } from "@/lib/api/live.api";
import StreamLiveChat from "@/components/stream-live-chat";
import FriendList from "@/components/friend-list";
import { Suspense } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk"
import { set } from "react-hook-form";


const LiveStream = () => {
  const searchParams = useSearchParams();
  const [attestation,setAttestation]=useState(null) as any
  const [loading,setLoader]=useState(false)

  const streamId = searchParams.get("streamId");

  const { isLoading, data: stream } = useQuery({
    queryKey: [QueryKeys.GET_STREAM_DETAILS, streamId],
    queryFn: () => _getStream(streamId as string),
    enabled: !!streamId,
  });

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
  });

  const signAttestation=async()=>{
    setLoader(true)
     try{
        const res = await client.createAttestation({
         schemaId: "0x10d",
         data: {
         role:"creator",
         signer:"0x5c12DB1E016bEa19aeD67C125dc5b036e39320Cb",
         timestamp:Date.now()
        
        },
        indexingValue:"0x5c12DB1E016bEa19aeD67C125dc5b036e39320Cb"
      
      });
  
      console.log(res,"res")
      res?.attestationId?.length >0&&setLoader(false)
      setAttestation(res)
     }catch(e){
      console.log(e)
     }
  }
console.log(stream?.data,"dta")

  return (
    <>
      {!isLoading && stream && stream.data && (
        <Stack px={7} spacing={10}>
         
          <LivestreamVideoPlayer
            streamKey={stream.data.stream_key}
            streamId={stream.data.stream_id}
            streamAuthId={streamId as string}
          />

          <Stack spacing={3}>
            <Text fontWeight={500} fontSize="2xl" textTransform="capitalize">
              {stream.data.stream_name}
            </Text>

            <HStack spacing={3}>
              <Avatar
                src={stream.data.user.avatar?.url}
                name={`${stream.data.user.firstname} ${stream.data.user.lastname}`}
              />

              <Text color="#FFFFFFE5">{`${stream.data.user.firstname} ${stream.data.user.lastname}`}</Text>
              {attestation ===null?
                <Button
                     color={"white"}
                     fontSize="12px"
                     onClick={signAttestation}
                   >
                  {loading ? 
                      <Center h="30vh">
                        <Spinner color="white" size={"12px"}/>
                      </Center>
                      :
                      "Sign Your Video"
                    }

                  
                 </Button>
                :
               <Button
                color={"white"}
                fontSize="12px"
                onClick={signAttestation}
                >
               {attestation?.attestationId}
             </Button>

              }
           
            </HStack>
          </Stack>

          <HStack alignItems="flex-start" spacing={4}>
            <Stack w="70%">
              <StreamLiveChat id={streamId as string} />
            </Stack>

            <Stack
              w="30%"
              bg={"whiteAlpha.100"}
              px={5}
              pt={2}
              pb={5}
              rounded="lg"
            >
              <FriendList />
            </Stack>
          </HStack>
        </Stack>
      )}

      {isLoading && (
        <Center w="full" h="50vh">
          <Spinner color="#C71F1F" />
        </Center>
      )}
    </>
  );
};

const LiveStreamPage = () => {
  return (
    <Suspense>
      <LiveStream />
    </Suspense>
  );
};

export default LiveStreamPage;
