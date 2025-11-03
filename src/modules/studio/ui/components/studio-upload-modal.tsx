"use client";

import ResponsiveDialog from "@/components/responsive-dialog";
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
      <ResponsiveDialog
        title="동영상 업로드"
        open={!!create.data}
        onOpenChange={() => create.reset()}
      >
        <h1 className="text-xl font-bold">
          동영상 파일을 드래그 앤 드롭하여 업로드
        </h1>
        <p className="text-xs text-muted-foreground">
          동영상을 게시하기 전에는 비공개로 설정됩니다.
        </p>
      </ResponsiveDialog>

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
