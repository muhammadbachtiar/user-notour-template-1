import CategoryService from "../../../services/controllers/category/category.service";
import { useQuery } from "@tanstack/react-query";

function useCategory(params = {}) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ["category", params],
        queryFn: async () => {
          return await CategoryService.getAll(params)
        },
      });

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useCategory;