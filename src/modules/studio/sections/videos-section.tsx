"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const VideosSection = () => {
  const trpc = useTRPC();

  const { data: videos } = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )
  );

  return <div>{JSON.stringify(videos)}</div>;
};

export default VideosSection;
