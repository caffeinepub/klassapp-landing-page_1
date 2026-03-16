import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useOnboardingCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["onboardingCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getOnboardingCount();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useSubmitOnboarding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      schoolName,
      schoolSize,
      contactName,
      contactEmail,
      contactPhone,
      role,
    }: {
      schoolName: string;
      schoolSize: string;
      contactName: string;
      contactEmail: string;
      contactPhone: string;
      role: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitOnboarding(
        schoolName,
        schoolSize,
        contactName,
        contactEmail,
        contactPhone,
        role,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboardingCount"] });
    },
  });
}
