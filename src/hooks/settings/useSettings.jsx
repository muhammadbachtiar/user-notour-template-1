import SettingsService from "../../services/controllers/setting/setting.service";
import { useQuery } from "@tanstack/react-query";

function useSetting(slug, params = {}) {

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: [slug, slug, params],
        queryFn: async () => {
          return await SettingsService.getOneSetting(slug, params);
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
  
  export default useSetting;