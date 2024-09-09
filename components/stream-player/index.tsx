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
              indexingValue: "0x5c12DB1E016bEa19aeD67C125dc5b036e39320Cb", // Bob's address
            },
         }
         )
         console.log(response,"ress")
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
             px="10px "
             py="10px"
            >
            {view?
                <IoCloseSharp 
                  style={{fontSize:"32px"}}
                  onClick={()=>setView(false)}
                />
                  :
                <FaEye 
                  style={{fontSize:"32px"}}
                  onClick={requestAttestation}
                />
            }
          
              

           </Box>

       </Box>
    </Stack>
  );
};

export default StreamPlayer;
