"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { _login } from "../../../lib/api/auth.api";
import { setAccessToken } from "../../../lib/utils";
import { LoginFields } from "@/lib/schema/signin.schema";
import { QueryKeys } from "@/lib/constants/keys";

const Signin = () => {
  const [errorResponse, setErrorResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: classValidatorResolver(LoginFields) });

  const { mutate, isPending } = useMutation({
    mutationFn: _login,
    onSuccess: (data) => {
      setAccessToken(data.data.access_token);
      replace(searchParams.get("redirect") ?? "/");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_USER_PROFILE],
      });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        setErrorResponse(error?.response?.data?.message);
      } else {
        setErrorResponse(error.message);
      }
    },
  });

  const login: SubmitHandler<LoginFields> = async (data) => {
    setErrorResponse("");
    mutate(data);
  };

  return (
    <Container>
      <VStack spacing={4}>
        <Box>
          <Text
            fontSize="4xl"
            color="#fff"
            textAlign="center"
            fontWeight="semibold"
          >
            Sign In
          </Text>
        </Box>
        <Box>
          <Text color="#fff" textAlign="center">
            Welcome. Please enter your details
          </Text>
        </Box>
      </VStack>

      <form onSubmit={handleSubmit(login)}>
        <Stack mt={10} spacing={5}>
          <FormControl isInvalid={errors.username ? true : false}>
            <FormLabel htmlFor="username" color="#fff">
              Username
            </FormLabel>
            <Controller
              name="username"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  variant="outline"
                  {...field}
                  color="#fff"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <Text paddingY={2} fontSize="sm" color="#fff">
                  {message}
                </Text>
              )}
            />
          </FormControl>

          <FormControl isInvalid={errors.password ? true : false}>
            <FormLabel htmlFor="password" color="#fff">
              Password
            </FormLabel>
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    variant="outline"
                    {...field}
                    color="#fff"
                  />
                  <InputRightElement width={14}>
                    <IconButton
                      icon={
                        showPassword ? (
                          <BiHide size={22} />
                        ) : (
                          <BiShow size={22} />
                        )
                      }
                      aria-label="show password"
                      onClick={() => setShowPassword((prev) => !prev)}
                      variant="link"
                      colorScheme={"gray"}
                    />
                  </InputRightElement>
                </InputGroup>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <Text paddingY={2} fontSize="sm" color="#fff">
                  {message}
                </Text>
              )}
            />
          </FormControl>

          <HStack justifyContent="space-between" w="full">
            <Checkbox defaultChecked color="#fff" colorScheme="primary">
              Remember me
            </Checkbox>
          </HStack>

          <Box pt={5}>
            <Button
              isLoading={isPending}
              w="full"
              size="lg"
              onClick={handleSubmit(login)}
              bg="primary.500"
              color="white"
            >
              Signin
            </Button>
          </Box>

          <HStack alignItems="center" justifyContent="center">
            <NextLink href="/auth/signup" passHref>
              <Link
                as="span"
                fontSize="sm"
                color="white"
                transition="all ease-in-out 300ms"
                _hover={{
                  color: "primary.500",
                }}
              >
                Don&apos;t have an account? Sign up
              </Link>
            </NextLink>
          </HStack>

          {errorResponse !== "" && (
            <Text textAlign="center" pt={7} fontSize="xl" color="#fff">
              {errorResponse}!
            </Text>
          )}
        </Stack>
      </form>
    </Container>
  );
};

const SigninPage = () => {
  return (
    <Suspense>
      <Signin />
    </Suspense>
  );
};

export default SigninPage;
