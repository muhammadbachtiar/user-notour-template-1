import SettingsService from "../../services/controllers/setting/setting.service";
import {useQuery} from "@tanstack/react-query"

function useStaticPage(params= {}, slug) {

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery({
        queryKey: [`static-page-${slug}`, slug, params],
        queryFn: async () => {
          return await SettingsService.getOneStaticPage(slug,params);
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
  
  export default useStaticPage;