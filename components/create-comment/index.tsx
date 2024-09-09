import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Spinner,
  Text,
  Box
} from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import { IoSend } from "react-icons/io5";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentField } from "@/lib/schema/comment.schema";
import { _createComment } from "@/lib/api/live.api";
import { QueryKeys } from "@/lib/constants/keys";
// import { Wallet } from "ethers";
// import { Client } from "@xmtp/xmtp-js";
import { AiOutlineDollar } from "react-icons/ai";

type Props = {
  id: string;
  scrollToComment: () => void;
};

const CreateComment = ({ id, scrollToComment }: Props) => {
  // const [xmtp,setXmtp]=useState(null) as any
  const [isTip,setIstip]=useState(false)
  // const [conv,setConv]=useState<any>(null)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<CommentField>({
    resolver: classValidatorResolver(CommentField),
  });


  // const initXmtp = async () => {
  //   const signer = Wallet.createRandom();
  //   const xmtp = await Client.create( signer , { env: "dev" });
  //   console.log(xmtp,"xtmp")
  //   setXmtp(xmtp) 
  // };

  // useEffect(()=>{
  //   initXmtp()
  // },[])

  // useEffect(()=>{
  //   const startBot=async()=>{
  //      try{
  //       const conversation = await xmtp.conversations.newConversation(
  //         "0xC792746196Cb489C50D2b0126192338DE5339189",
  //       );
  //       setConv(conversation)
  //      }catch(e){
  //       console.log(e)
  //      }
     
  //   }
  //   startBot()
   
  // },[xmtp])

  // useEffect(()=>{
  //   getConvs()
  // })
  //  const getConvs=async()=>{
  //     try{
  //       for await (const message of await conv?.streamMessages()) {
  //         if (message.senderAddress === xmtp.address) {
  //           // This message was sent from me
  //           continue;
  //         }
  //         console.log(`New message from ${message.senderAddress}: ${message.content}`);

  //       }

  //      }catch(e){
  //        console.log(e)
  //      }
  //  }

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: _createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_STREAM_CHATS] });
      scrollToComment();
      reset();
    },
  });

  const createComment: SubmitHandler<CommentField> = async (data) => {
    console.log(data,"data")
    if(data?.comment_text !='/tip'){
      mutate({ id, data });
    }else{
      console.log("/tip")
      // setIstip(true)
      // console.log(conv,"conv")
      // await conv?.send("/tip @bo @alix 15");
    }
  };

  return (
    <Stack w="full" as="form" onSubmit={handleSubmit(createComment)}>
      {isTip&&
          <Box w="80%" display={'flex'} justifyContent="end">
              <Box 
                background={"#666363"} 
                w="20%" 
                py="10px"
                rounded="xl"
                px="10px"
                > 
                  <Text fontSize={"16px"} display="flex"
                    alignItems={"center"}
                    columnGap="8px"
                    >
                      <span>Tip </span>
                      <AiOutlineDollar 
                         style={{color:"purple",fontSize:"20px"}}
                      />
                  </Text>
            </Box>
         </Box>
       }
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
