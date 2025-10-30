"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import FilterCarousel from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId?: string;
}
export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <ErrorBoundary fallback={<CartegoriesSkeleton />}>
      <Suspense fallback={<p>Loading...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CartegoriesSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const trpc = useTRPC();

  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
};

export default CategoriesSection;
