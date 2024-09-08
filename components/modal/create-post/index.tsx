import React, { useRef, useState } from "react";
import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  useColorModeValue,
  Stack,
  Avatar,
  Textarea,
  FormControl,
  Input,
  IconButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { IsString } from "class-validator";
import { _createPost } from "@/lib/api/post.api";
import { Montserrat } from "next/font/google";
import { BsImages } from "react-icons/bs";
import { BiVideoPlus } from "react-icons/bi";
import { compressImage } from "@/lib/utils";
import { CloseIcon } from "@chakra-ui/icons";
import { useUser } from "@/lib/hooks/user.hook";

const montserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export class PostField {
  @IsString()
  post_text: string;
}

const CreatePostModal = ({ isOpen, onClose }: Props) => {
  const bgColor = useColorModeValue("#EEECEC", "#262323");
  const closeButtonColor = useColorModeValue("#ccc", "#2F3030");
  const { user } = useUser();
  const queryClient = useQueryClient();

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectLoading, setSelectLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [blobImageFiles, setBlobImageFiles] = useState<string[]>([]);

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef?.current?.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectLoading(true);
    if (e.target.files) {
      if (e.target?.files?.length > 2) {
        alert("Please select only 2 images");
        setSelectLoading(false);
        e.preventDefault();
        return;
      } else {
        const compressedImagesArray: string[] = [];
        const blogFilesImageArray: string[] = [];

        const reader = new FileReader();

        for (const file of Array.from(e.target.files)) {
          const compressedImg = await compressImage(file);
          blogFilesImageArray.push(compressedImg as string);
          const blobImage = await fetch(compressedImg as string);
          const blob = await blobImage.blob();

          reader.onload = () => {
            if (typeof reader.result === "string") {
              compressedImagesArray.push(reader.result);
            }
          };

          reader.readAsDataURL(blob);
        }
        setBlobImageFiles(blogFilesImageArray);
        setImageFiles(compressedImagesArray);
        setSelectLoading(false);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const img = blobImageFiles[index];
    setBlobImageFiles((prev) => prev.filter((x) => x !== img));
    setImageFiles((prev) => prev.filter((x) => x !== img));
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<PostField>({ resolver: classValidatorResolver(PostField) });

  const { mutate, isPending } = useMutation({
    mutationFn: (p: { post_text: string; imageFiles: string[] }) =>
      _createPost(p.post_text, p.imageFiles),
    onSuccess: (data) => {
      reset();
      onClose();
      setImageFiles([]);
      setBlobImageFiles([]);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {},
  });

  const publish: SubmitHandler<PostField> = async (data) => {
    if (!data.post_text && imageFiles.length === 0) return;
    mutate({ post_text: data.post_text, imageFiles });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} className={montserrat.className}>
        <ModalCloseButton size="sm" rounded="full" bg={closeButtonColor} />
        <Stack pt={4} spacing={5}>
          <HStack px={4} spacing={4}>
            <Avatar
              size="md"
              src={user?.data.avatar?.url}
              name={`${user?.data.firstname} ${user?.data.lastname}`}
            />
            <Stack spacing={0}>
              <Text
                fontSize="md"
                textTransform="capitalize"
              >{`${user?.data.firstname} ${user?.data.lastname}`}</Text>
            </Stack>
          </HStack>

          <FormControl px={1}>
            <Controller
              name="post_text"
              control={control}
              defaultValue={""}
              rules={{ required: false }}
              render={({ field }) => (
                <Textarea
                  fontSize="sm"
                  placeholder="Write something here ..."
                  _placeholder={{
                    color: "whiteAlpha.500",
                    fontSize: "sm",
                    fontWeight: "light",
                  }}
                  _focus={{ boxShadow: "none" }}
                  border="none"
                  rows={blobImageFiles.length > 0 ? 2 : 8}
                  {...field}
                />
              )}
            />
          </FormControl>

          <HStack
            gap={1}
            px={5}
            overflowX="auto"
            w="full"
            className="no-scrollbar"
          >
            {blobImageFiles.length > 0 &&
              blobImageFiles.map((img, i) => (
                <Stack
                  key={i}
                  h="200px"
                  minW="300px"
                  rounded="lg"
                  bgImage={`url(${img})`}
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  bgPosition="center"
                >
                  <HStack
                    bg="rgba(7, 7, 7, 0.4)"
                    px={5}
                    py={4}
                    w="full"
                    justifyContent="space-between"
                    roundedTop="lg"
                  >
                    <IconButton
                      aria-label="edit-image"
                      rounded="full"
                      colorScheme="gray"
                      size="xs"
                    />
                    <IconButton
                      aria-label="remove-image"
                      rounded="full"
                      colorScheme="gray"
                      size="xs"
                      icon={<CloseIcon fontSize={10} />}
                      onClick={() => handleRemoveImage(i)}
                    />
                  </HStack>
                </Stack>
              ))}
          </HStack>

          {selectLoading && (
            <Center>
              <Spinner color="primary.500" thickness="3px" size="sm" />
            </Center>
          )}

          <HStack w="full" p={4} bg="#0D0B0B" justifyContent="space-between">
            <HStack spacing={5}>
              <Stack spacing={0} gap={0}>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
                <IconButton
                  aria-label="send image"
                  icon={<BsImages fontSize={22} color="#C71F1F" />}
                  colorScheme="gray"
                  variant="ghost"
                  rounded="full"
                  onClick={handleImageClick}
                />
              </Stack>
              <IconButton
                aria-label="send video"
                icon={<BiVideoPlus fontSize={27} color="#C71F1F" />}
                colorScheme="gray"
                variant="ghost"
                rounded="full"
              />
            </HStack>
            <Button
              bg="primary.500"
              borderRadius="xl"
              size="sm"
              color="white"
              fontSize="xs"
              isLoading={isPending}
              loadingText="Please wait..."
            >
              Improve post
            </Button>
            <Button
              bg="primary.500"
              borderRadius="xl"
              size="sm"
              color="white"
              fontSize="xs"
              onClick={handleSubmit(publish)}
              isLoading={isPending}
              loadingText="Please wait..."
            >
              Publish post
            </Button>
          </HStack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
