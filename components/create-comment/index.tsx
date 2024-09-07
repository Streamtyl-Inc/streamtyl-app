import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { IoSend } from "react-icons/io5";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentField } from "@/lib/schema/comment.schema";
// import { _createComment } from "../../../../lib/api/live.api";
// import { QueryKeys } from "../../../../lib/constants/keys";

type Props = {
  id: string;
  scrollToComment: () => void;
};

const CreateComment = ({ id, scrollToComment }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<CommentField>({
    resolver: classValidatorResolver(CommentField),
  });

  const queryClient = useQueryClient();

  //   const { isLoading, mutate } = useMutation({
  //     mutationFn: _createComment,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_STREAM_CHATS] });
  //       scrollToComment();
  //       reset();
  //     },
  //   });

  //   const createComment: SubmitHandler<CommentField> = async (data) => {
  //     mutate({ id, data });
  //   };

  return (
    <Stack
      w="full"
      as="form"
      //   onSubmit={ handleSubmit(createComment) }
    >
      <FormControl w="80%">
        <Controller
          name="comment_text"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <InputGroup>
              <Input
                type="text"
                placeholder="Add a comment..."
                background="inherit"
                border="1px solid #8D8A8A"
                w="full"
                rounded="2xl"
                _focus={{
                  boxShadow: "none",
                }}
                _placeholder={{
                  color: "#FFFFFFE5",
                  fontSize: "xs",
                }}
                {...field}
              />

              <InputRightElement cursor="pointer">
                <IconButton
                  type="submit"
                  aria-label="send"
                  rounded="2xl"
                  variant="ghost"
                  size="md"
                  colorScheme="gray"
                  icon={<IoSend color="#C71F1F" />}
                  disabled={errors ? true : false}
                />
              </InputRightElement>
            </InputGroup>
          )}
        />
      </FormControl>
    </Stack>
  );
};

export default CreateComment;
