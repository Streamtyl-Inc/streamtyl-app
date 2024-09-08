import {ethers} from "ethers";
import contractABI from "../utils/JoystickAiAbi.json"
export const useAIImageGenerator = async (message: any) => {
  if (!process.env.NEXT_PUBLIC_JOYSTICK_CA) {
    throw new Error("NEXT_PUBLIC_JOYSTICK_CA env variable is not set.");
  }

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL); // Add your RPC URL in .env
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY; // Add your private key in .env
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractAddress = process.env.NEXT_PUBLIC_JOYSTICK_CA;
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  console.log(wallet)

  try {
    const transactionResponse = await contract.initializeDalleCall(`A gamefied thumbnail for stream: ${message}`);
    const receipt = await transactionResponse.wait();

    console.log(`Transaction hash: ${receipt.hash}`);
    let lastResponse = await contract.lastResponse();
    let newResponse = lastResponse;

    while (newResponse === lastResponse) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      newResponse = await contract.lastResponse();
      console.log(".");
    }

    console.log(`Image generation completed: ${newResponse}`);
    return newResponse;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
