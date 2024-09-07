import imageCompression from "browser-image-compression";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authKey = "streamtyl_auth_key";

export const getAccessToken = (): string | null => cookies.get(authKey);

export const setAccessToken = (token: string) => cookies.set(authKey, token);

export const removeAccessToken = () => cookies.remove(authKey);

export const NumberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const compressImage = async (img?: File) => {
  const options = {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 1920,
  };

  if (!img) return;

  const compressedFile = await imageCompression(img, options);

  const compressedImageUrl = URL.createObjectURL(compressedFile);

  return compressedImageUrl;
};

export const convertVideoURLToFile = async (videoUrl: string | undefined) => {
  try {
    if (videoUrl) {
      const response = await fetch(videoUrl);

      const blob = await response.blob();

      const file = new File([blob], `video-${Math.random().toString()}.mp4`, {
        type: "video/mp4",
      });

      return file;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkTimeWindow = (date: Date, time: number): boolean => {
  const eventDate = new Date(date);
  const currentDate = new Date();

  const timeDiff = (currentDate.getTime() - eventDate.getTime()) / (1000 * 60);

  return timeDiff <= time;
};

export const getEmbedUrl = (youtubeUrl: string): string => {
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
};
