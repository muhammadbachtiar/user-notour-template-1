import { useLocation } from "react-router-dom";
import AsideContent from "../../components/app-layout/asideContent";
import RichTextContent from "../../atoms/RichTextContent";
import useStaticPage from "../../hooks/settings/useStaticPage";
import useSettings from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";
import { findMenuItemByPath } from "../../services/utils/findMenuItemByPath";

const Container = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const { data: menu } = useSettings(`menu-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const path = pathSegments || [];
  const menuItem = Array.isArray(menu?.value) ? findMenuItemByPath(menu.value, path) : null;

  const { data: staticPage, isLoading, isError, isFetching, refetch } = useStaticPage({}, menuItem?.staticPage || "");

  return (
    <div className="min-h-screen w-full">
        <AsideContent>
            {isLoading || (!staticPage || !staticPage.content) && isFetching ? (
                    <div className="animate-pulse space-y-4 p-6">
                        <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                        <div className="flex space-x-4">
                        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-56 w-full bg-gray-200 rounded"></div>
                        <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
            ) : !isError && !isFetching && (!staticPage || !staticPage.content) ? (
                <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isError && !isFetching  ? (
                <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                    <Refetch refetch={refetch} />
                    </div>
                </div>
            ) : (
                <RichTextContent content={staticPage.content}  />
            )}
        </AsideContent> 
    </div>
  );
};

export default Container;
