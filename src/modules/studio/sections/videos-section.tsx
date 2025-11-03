"use client";

import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export const VideosSection = () => {
  return (
    <ErrorBoundary fallback={<p>Failed to load videos.</p>}>
      <Suspense fallback={<p>Loading videos...</p>}>
        <VideosSectionSupense />
      </Suspense>
    </ErrorBoundary>
  );
};

export const VideosSectionSupense = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const query = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )
  );
  const {
    data: videos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = query;

  return (
    <div>
      <div className="border-y ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">동영상</TableHead>
              <TableHead>공개 상태</TableHead>
              <TableHead>처리 상태</TableHead>
              <TableHead>날짜</TableHead>
              <TableHead className="text-right">조회수</TableHead>
              <TableHead className="text-right">댓글</TableHead>
              <TableHead className="text-right pr-6">좋아요</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <TableRow
                  key={video.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/studio/videos/${video.id}`)}
                >
                  <TableCell>{video.title}</TableCell>
                  <TableCell>공개 상태</TableCell>
                  <TableCell>처리 상태</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell className="text-right text-sm">조회수</TableCell>
                  <TableCell className="text-right text-sm">댓글</TableCell>
                  <TableCell className="text-right text-sm pr-6">
                    좋아요
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default VideosSection;
