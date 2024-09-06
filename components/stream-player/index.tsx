import { useState, useRef } from "react";
import { Stack, Spinner } from "@chakra-ui/react";

type Props = {
  src: string;
};

const StreamPlayer = ({ src }: Props) => {
  const [loading, setLoading] = useState(true);
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
    </Stack>
  );
};

export default StreamPlayer;
