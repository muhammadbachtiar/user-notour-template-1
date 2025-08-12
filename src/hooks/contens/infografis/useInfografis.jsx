import InfografisService from "../../../services/controllers/infografis/infografis.service";
import { useQuery } from "@tanstack/react-query";

function useInfografis(params = {}) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: ['infografis', params],
        queryFn: async () => {
          return await InfografisService.getAll(params);
        },
      })
    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useInfografis;