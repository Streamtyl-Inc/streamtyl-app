import { useState, useRef } from "react";
import { Stack, Spinner ,Box,Text} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import {getAttestation} from "../../lib/api/attestatio.api"
type Props = {
  src: string;
};

const StreamPlayer = ({ src }: Props) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [attestation,setAttestation]=useState() as any
  const videoRef = useRef(null);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleCanPlay = () => {
    setLoading(false);
  };

  const handleWaiting = () => {
    setLoading(true);
  };

  const handlePlaying = () => {
    setLoading(false);
  };

  const requestAttestation=async()=>{
        setView(true)
      try{
         const response=await getAttestation("index/attestations",
         {
            method: "GET",
            params: {
              mode: "onchain", // Data storage location
              schemaId: "onchain_evm_11155111_0x10d", // Your full schema's ID
              attester: "0x66D7A32aD5abc224519f6891cdCFdaF8397CfDaf", // Alice's address
              indexingValue: "5c2613fd-c674-4486-bc6f-65e0a1e4a727".toLowerCase(), // Bob's address
            },
         }
         )
         setAttestation(response?.data?.rows[0])
       }catch(e){
        console.log(e)
       }
  }

  return (
    <Stack bg="inherit" w="full" h="600px" pos="relative">
        <video
          ref={videoRef}
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          controls
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
        />
        <Box 
          w="full"
          position={"absolute"}
          top="0"
          h={view?'full':'20%'}
          
        >
           <Box 
             w="full"
             h="full"
             px="10px "
             py="10px"   
             zIndex="99999"
            >
            {view?
                <Box
                  w="28%"
                  h="37%"
                  background={"white"}
                  rounded="sm"
                  display={"flex"}
                  flexDirection="column"
                 >
                  <Box 
                     w="full"
                     px="4px"
                     py="4px"
                     display="flex"
                     alignItems={"center"}
                     columnGap="5px"
                     borderBottom={"1px"}
                     borderColor="black"
                  >
                      <IoCloseSharp 
                          style={{fontSize:"24px",color:"black"}}
                          onClick={()=>setView(false)}
                        />
                                  <Text color={"black"} w="full">Content Credentials</Text>
                  </Box >
                  <Box
                      w="full"
                      h="full"
                      background={"white"}
                      rounded="sm"
                      display={"flex"}
                      flexDirection="column"
                      color={"black"}
                      px="4px"
                      py="4px"
                      rowGap={"10px"}
                    >
            
                       <Box
                         display="flex"
                         flexDirection="column"
                        >
                          <Text color={"black"} w="full" fontSize={"12px"}>Attestation ID</Text>
                          <Text color={"black"} w="full" fontSize={"14px"}>{attestation?.attestationId}</Text>
                      </Box>
                      <Box
                         display="flex"
                         flexDirection="column"
                        >
                          <Text color={"black"} w="full" fontSize={"10px"}>Signed by</Text>
                          <Text color={"black"} w="full" fontSize={"14px"}>{attestation?.attester?.slice(0,10)}...
                          {attestation?.attester?.slice(-4)}</Text>
                      </Box>
                      <Box
                         display="flex"
                         flexDirection="column"
                        >
                          <Text color={"black"} w="full" fontSize={"10px"}>Data storage</Text>
                          <Text color={"black"} w="full" fontSize={"14px"}>{attestation?.dataLocation}</Text>
                      </Box>
                      <Box
                         display="flex"
                         flexDirection="column"
                        >
                          <Text color={"black"} w="full"  fontSize={"10px"}>Date</Text>
                          <Text color={"black"} w="full"></Text>
                      </Box>
                    </Box>

                  
                </Box>
             
                  :
                <FaEye 
                  style={{fontSize:"27px"}}
                  onClick={requestAttestation}
                />
             }
          
              

           </Box>

       </Box>
    </Stack>
  );
};

export default StreamPlayer;
