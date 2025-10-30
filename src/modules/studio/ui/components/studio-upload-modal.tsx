"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

const StudioUploadModal = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const create = useMutation(
    trpc.videos.create.mutationOptions({
      onSuccess: () => {
        toast.success("동영상이 생성되었습니다.");
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        toast.error(`동영상 생성에 실패했습니다: ${error.message}`);
      },
    })
  );

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        만들기
      </Button>
    </>
  );
};

export default StudioUploadModal;
