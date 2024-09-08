import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { removeAccessToken } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutModal = ({ isOpen, onClose }: Props) => {
  const { replace } = useRouter();

  const logout = () => {
    removeAccessToken();
    replace("/auth/signin");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#262323">
        <VStack spacing={5} p={5}>
          <Text fontSize="md" color="white">
            Are you sure you want to logout?
          </Text>
          <HStack gap={3}>
            <Button colorScheme="gray" size="lg" onClick={onClose}>
              No
            </Button>
            <Button bg="primary.500" color="white" size="lg" onClick={logout}>
              Yes
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
