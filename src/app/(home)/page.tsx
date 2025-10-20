import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ClientGreeting } from "./client-greeting";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
