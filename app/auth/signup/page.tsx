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
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { SignupFields } from "@/lib/schema/signup.schema";
import { _signup } from "../../../lib/api/auth.api";

const Signup = () => {
  const [agreement, setAgreement] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFields>({ resolver: classValidatorResolver(SignupFields) });

  const { mutate, isPending } = useMutation({
    mutationFn: _signup,
    onSuccess: (data) => {
      replace("/auth/login");
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        setErrorResponse(error?.response?.data?.message);
      } else {
        setErrorResponse(error.message);
      }
    },
  });

  const signup: SubmitHandler<SignupFields> = async (data) => {
    setErrorResponse("");
    mutate(data);
  };

  return (
    <Container>
      <Text
        fontSize="4xl"
        color="#fff"
        textAlign="center"
        fontWeight="semibold"
      >
        Create Account
      </Text>

      <form onSubmit={handleSubmit(signup)}>
        <Stack mt={10} spacing={6}>
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

          <FormControl isInvalid={errors.email ? true : false}>
            <FormLabel htmlFor="email" color="#fff">
              Email Address
            </FormLabel>
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  variant="outline"
                  {...field}
                  color="#fff"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="email"
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
                  <InputRightElement width="4.5rem">
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

          <Checkbox
            colorScheme="primary"
            color="#fff"
            isChecked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          >
            I agree to platform&apos;s Terms of service and privacy policy
          </Checkbox>

          <Box pt={5}>
            <Button
              isLoading={isPending}
              w="full"
              size="lg"
              onClick={handleSubmit(signup)}
              isDisabled={!agreement}
              bg="primary.500"
              color="white"
            >
              Sign Up
            </Button>
          </Box>

          <HStack alignItems="center" justifyContent="center">
            <NextLink href="/auth/signin" passHref>
              <Link
                as="span"
                fontSize="sm"
                color="white"
                transition="all ease-in-out 300ms"
                _hover={{
                  color: "primary.500",
                }}
              >
                Do you already have an account? Sign in
              </Link>
            </NextLink>
          </HStack>

          {errorResponse !== "" && (
            <Text textAlign="center" pt={7} fontSize="2xl" color="#fff">
              {errorResponse}!
            </Text>
          )}
        </Stack>
      </form>
    </Container>
  );
};

export default Signup;
