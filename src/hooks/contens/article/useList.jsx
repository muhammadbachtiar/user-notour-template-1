import ArticleService from "../../../services/controllers/article/article.service";
import { useInfiniteQuery } from "@tanstack/react-query";

function useArticle(params = {}, categoryId = 0 ) {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        refetch,
      } = useInfiniteQuery({
        initialPageParam: null,
        queryKey: ["articles", categoryId, params],
        queryFn: async ({ pageParam = null }) => {
          return await ArticleService.getAll(
                { 
                    with:"category", 
                    ...(categoryId !== 0 && { category: categoryId }),
                    ...params,
                    cursor: pageParam
                }
            );
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage?.meta?.next_page_url) {
                return undefined;
            }
            try {
                const url = new URL(lastPage.meta.next_page_url);
                const cursor = url.searchParams.get("cursor");
                return cursor ?? undefined;
            } catch (error) {
                console.error("Error parsing URL:", error);
                return undefined;
            }
        }
      })

    return {
      data,
      isLoading,
      isFetching,
      hasNextPage,
      fetchNextPage,
      refetch,
      isError,
    };
  }
  
  export default useArticle;