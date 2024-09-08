import { useEffect, useState, useRef } from "react";
import {
  Stack,
  Tooltip,
  IconButton,
  HStack,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsMic } from "react-icons/bs";
import { BiWebcam } from "react-icons/bi";
import { MdCallEnd, MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { PiWebcamSlashBold } from "react-icons/pi";
import { TbScreenShare } from "react-icons/tb";
import { useRouter } from "next/navigation";

type Props = {
  streamKey: string | undefined;
  streamId: string | undefined;
  streamAuthId: string;
};

const LivestreamVideoPlayer = ({
  streamKey,
  streamId,
  streamAuthId,
}: Props) => {
  const [stream, setStream] = useState<MediaStream>();
  const [live, setLive] = useState(false);
  const [muted, setmuted] = useState(false);
  const [cam, setCam] = useState(false);
  const [sharing, setSharing] = useState(false);

  const { replace } = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<any>(null);

  let socket: any;
  const webSocketURL = `wss://vps.freetyl.io/rtmp/${streamKey}`;

  const startCamera = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: window.visualViewport?.width },
          height: { max: 720 },
          frameRate: { ideal: 30 },
          facingMode: "user",
        },
        audio: true,
      })
      .then((vstream) => {
        setStream(vstream);
        if (videoRef.current) {
          videoRef.current.srcObject = vstream;
          setCam(true);
        }
      })
      .catch((e) => {});
  };

  const shareScreen = async () => {
    let screenShareStream: MediaStream;
    await navigator.mediaDevices
      .getDisplayMedia({
        video: {
          width: { max: 1280 },
          height: { max: 720 },
          frameRate: { ideal: 30 },
        },
        audio: true,
      })
      .then((vstream) => {
        setStream(vstream);
        screenShareStream = new MediaStream(vstream);

        mediaRecorder.current = new MediaRecorder(screenShareStream, {
          mimeType: "video/webm;codecs=h264",
          videoBitsPerSecond: 2 * 1024 * 1024,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = screenShareStream;
          setSharing(true);
        }
        setLive(true);
        mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
          if (e.data.size > 0) {
            if (live && socket && socket.readyState === WebSocket.OPEN) {
              socket.send(e.data);
            } else {
              setLive(false);
              reconnect();
            }
          }
        };
        mediaRecorder.current.start(200);
      });
  };

  const toggleMic = () => {
    if (stream) {
      setmuted(!muted);
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    } else {
      setmuted(!muted);
    }
  };

  const endStream = async () => {
    setLive(false);
    setmuted(false);
    setSharing(false);
    setCam(false);
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  };

  const endLive = async () => {
    socket?.close();
    endStream();
    replace("/");
  };

  const reconnect = () => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      setLive(false);
      try {
        socket = new WebSocket(webSocketURL);
        setLive(true);
      } catch (error) {
        setLive(false);
        reconnect();
      }
    }
  };

  const connectSocket = () => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket = new WebSocket(webSocketURL);

      socket.addEventListener("open", (event: any) => {
        setLive(true);
      });

      socket.addEventListener("close", (event: any) => {
        setLive(false);
        if (event.code === 1000) {
        } else {
          setLive(false);
          reconnect();
        }
      });
      socket.addEventListener("error", (event: any) => {
        setLive(false);
      });
    }
  };

  useEffect(() => {
    connectSocket();

    // eslint-disable-next-line
  }, [streamKey, socket]);

  return (
    <Stack spacing={5} mt={3}>
      <Stack bg="inherit" w="full" h="600px" pos="relative">
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          autoPlay
        />

        {!live && (
          <Stack
            pos="absolute"
            w="full"
            h="full"
            zIndex={9}
            opacity={0.7}
            background="black"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            rowGap="8px"
          >
            <Spinner color="#C71F1F" />
            <Text color="white">Connecting...</Text>
          </Stack>
        )}
      </Stack>
      <HStack w="full" justifyContent="center" spacing={5}>
        {muted ? (
          <Tooltip hasArrow label="Unmute microphone">
            <IconButton
              aria-label="unmute"
              icon={<AiOutlineAudioMuted style={{ fontSize: "20px" }} />}
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={toggleMic}
            />
          </Tooltip>
        ) : (
          <Tooltip hasArrow label="Mute microphone">
            <IconButton
              aria-label="mute"
              icon={<BsMic style={{ fontSize: "20px" }} />}
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={toggleMic}
            />
          </Tooltip>
        )}

        {cam ? (
          <Tooltip hasArrow label="Stop camera">
            <IconButton
              aria-label="stop camera"
              icon={<PiWebcamSlashBold style={{ fontSize: "20px" }} />}
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={endStream}
            />
          </Tooltip>
        ) : (
          <Tooltip hasArrow label="Start camera">
            <IconButton
              aria-label="start camera"
              icon={<BiWebcam style={{ fontSize: "20px" }} />}
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={startCamera}
            />
          </Tooltip>
        )}

        {sharing ? (
          <Tooltip hasArrow label="Stop sharing">
            <IconButton
              aria-label="stop sharing"
              icon={
                <MdOutlineDesktopAccessDisabled style={{ fontSize: "20px" }} />
              }
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={endStream}
            />
          </Tooltip>
        ) : (
          <Tooltip hasArrow label="Share screen">
            <IconButton
              aria-label="share screen"
              icon={<TbScreenShare style={{ fontSize: "20px" }} />}
              background={"#2B2A2A"}
              color={"white"}
              borderRadius="lg"
              onClick={shareScreen}
            />
          </Tooltip>
        )}

        <Tooltip hasArrow label="End Live">
          <IconButton
            aria-label="end live"
            icon={<MdCallEnd style={{ fontSize: "20px" }} />}
            background="#C71F1F"
            color={"white"}
            borderRadius="lg"
            onClick={() => endLive()}
          />
        </Tooltip>
      </HStack>
    </Stack>
  );
};

export default LivestreamVideoPlayer;
