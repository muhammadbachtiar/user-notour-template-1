import { useQuery } from "@tanstack/react-query";
import ArticleService from "../../../services/controllers/article/article.service";

function useArticleDetail(params = {}, slug, shouldFetch ,initialData) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } =  useQuery({
        queryKey: ["article", slug, params],
        queryFn: async () => {
          return await ArticleService.getOne(slug, params)
        },
        enabled: shouldFetch,
        initialData: {data: initialData }
      })

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useArticleDetail;