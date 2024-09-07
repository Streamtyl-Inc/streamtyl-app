import { _getAuthProfile } from "@/lib/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";

export const useAuthUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: [QueryKeys.GET_AUTH_PROFILE],
    queryFn: _getAuthProfile,
    retry: 1,
    staleTime: 0,
  });

  return { isLoading, user };
};
