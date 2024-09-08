import {
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  HStack,
  Text,
  Input,
  Select,
  FormLabel,
  FormControl,
  Checkbox,
  Button,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useRef, useState, useContext, useEffect } from "react";
import { Montserrat } from "next/font/google";
import { MdArrowDropDown } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useCreateStream } from "@livepeer/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NameField } from "@/lib/schema/create-stream.schema";
import { useUser } from "@/lib/hooks/user.hook";
import { _createStream } from "@/lib/api/live.api";
// import { ProfileContext } from "../../../lib/contexts/profile.context";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const montserrat = Montserrat({ subsets: ["latin"] });

const GoLiveModal = ({ isOpen, onClose }: Props) => {
  const bgColor = useColorModeValue("#EEECEC", "#262323");
  const [errorResponse, setErrorResponse] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const user = useContext(ProfileContext);

  const { user } = useUser();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<NameField>({
    resolver: classValidatorResolver(NameField),
  });

  const { push } = useRouter();

  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput?.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImageFile(result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream({ name: watch("stream_name"), record: true });

  const create_stream: SubmitHandler<NameField> = (data) => {
    setErrorResponse("");
    if (imageFile) {
      setLoading(true);
      try {
        createStream?.();
      } catch (error: any) {
        setErrorResponse(error?.message as string);
        setLoading(false);
      }
    } else {
      return;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: _createStream,
    onSuccess: (data) => {
      push(`/stream/setup?stream=${data?.data.id}`);
      onClose();
      reset();
      setImageFile(null);
      setLoading(false);
    },
    onError: (err: any) => {
      if (err?.response?.data) {
        setErrorResponse(err?.response?.data?.message);
      } else {
        setErrorResponse(err.message);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (stream && status === "success" && user && user.data && imageFile)
      mutate({ data: stream, user: user.data, file: imageFile });
  }, [stream]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="5xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg={bgColor} className={`${montserrat.className}`}>
        <Stack p={10} spacing={8}>
          <HStack alignItems="flex-start" spacing={7}>
            <Stack spacing={3} w="40%">
              <Text>Stream Cover</Text>

              <Stack
                bg={imageFile ? "rgba(0,0,0,.3)" : "#FFFFFFE5"}
                bgSize="cover"
                bgRepeat="no-repeat"
                alignItems="center"
                justifyContent="center"
                pos="relative"
                rounded="lg"
                w="full"
                h="400px"
                maxW="full"
                maxH="full"
              >
                {imageFile && (
                  <Image
                    src={imageFile}
                    alt={imageFile.charAt(2)}
                    w="full"
                    h="full"
                    rounded="inherit"
                    objectFit="cover"
                  />
                )}
                <IconButton
                  icon={<LuImagePlus fontSize={60} />}
                  aria-label="upload-image"
                  pos="absolute"
                  variant="ghost"
                  color="#6563FF"
                  colorScheme="gray"
                  size="lg"
                  onClick={handleClick}
                />
              </Stack>

              <Input
                type="file"
                accept="image/*"
                multiple={false}
                hidden
                ref={fileInput}
                onChange={handleFileChange}
                required
              />
            </Stack>

            <Stack
              w="60%"
              as="form"
              spacing={5}
              onSubmit={handleSubmit(create_stream)}
            >
              <FormControl>
                <FormLabel>Stream name</FormLabel>
                <Controller
                  name="stream_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Give your stream a name"
                      background="blackAlpha.700"
                      border="none"
                      w="full"
                      rounded="lg"
                      _focus={{
                        boxShadow: "none",
                      }}
                      _placeholder={{
                        color: "whiteAlpha.700",
                        fontSize: "xs",
                      }}
                      {...field}
                    />
                  )}
                />
              </FormControl>

              <Stack spacing={0}>
                <FormLabel>Category</FormLabel>
                <Select
                  variant="filled"
                  bg="blackAlpha.700"
                  fontSize="xs"
                  w={200}
                  icon={<MdArrowDropDown />}
                >
                  <option value="games">Games</option>
                </Select>
              </Stack>

              <Stack spacing={0}>
                <FormLabel>What game do you want to stream?</FormLabel>
                <Select
                  variant="filled"
                  bg="blackAlpha.700"
                  fontSize="xs"
                  w={200}
                  icon={<MdArrowDropDown />}
                >
                  <option value="fortnite">Fortnite</option>
                </Select>
              </Stack>

              <Stack spacing={0}>
                <FormLabel>Stream Schedule</FormLabel>
                <Select
                  variant="filled"
                  bg="blackAlpha.700"
                  fontSize="xs"
                  w={200}
                  icon={<MdArrowDropDown />}
                >
                  <option value="fortnite">Now</option>
                </Select>
              </Stack>

              <Checkbox color="#fff" colorScheme="primary">
                Record this stream
              </Checkbox>

              <HStack justifyContent="flex-end" w="full" pt={10}>
                <Button variant="ghost" color="white" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  bg="primary.500"
                  color="white"
                  type="submit"
                  isLoading={loading}
                >
                  Create Stream
                </Button>
              </HStack>
            </Stack>
          </HStack>

          {errorResponse !== "" && (
            <Text textAlign="center" pt={7} fontSize="2xl" color="#fff">
              {errorResponse}!
            </Text>
          )}
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default GoLiveModal;
