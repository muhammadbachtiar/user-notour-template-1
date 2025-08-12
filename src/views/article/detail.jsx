import { useParams } from "react-router-dom";
import ThumbnailBanner from "../../atoms/ThumbnailBanner";
import useArticleDetail from "../../hooks/contens/article/useDetail";
import Refetch from "../../atoms/refetch";
import AsideContent from "../../components/app-layout/asideContent";
import RichTextContent from "../../atoms/RichTextContent";

const ArticleDetail = () => {
    const { slug } = useParams();
    const {
        data: article,
        isLoading: isLoadingArticle,
        isError: isErrorArticle,
        isFetching: isFetchingArticle,
        refetch: refetchArticle,
      } = useArticleDetail({ with: "user,category"}, slug,  true, {});
      
  return (
    <>  
        <div className="min-h-screen w-full">
            <AsideContent>
                {isLoadingArticle || ( !article || Object.keys(article || {}).length === 0) && isFetchingArticle ? (
                    <div className="pt-12 px-4 md:px-32 w-full min-h-screen bg-[#F3F9FB]">
                        <div className="h-72 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                        <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="h-2.5 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                        </h5>
                        <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                        <div className="flex flex-row w-full my-2 gap-1 justify-items-start justify-center">
                        <div className="flex flex-row">
                            <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">
                            <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                            </span>
                            <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                            <span className="self-center align-baseline text-xs font-medium text-black">
                            <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                            </span>
                            <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                            <span className="self-center align-baseline text-xs font-medium text-black">
                            <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                            </span>
                        </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-2.5 w-full bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                        ))}
                        </div>
                        <div className="flex flex-row w-full my-3 gap-1 justify-items-start justify-end">
                        <div className="flex flex-row">
                            <div className="h-2.5 w-48 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>
                        </div>
                    </div>
                ) : !isErrorArticle && !isFetchingArticle && (!article || Object.keys(article || {}).length === 0) ? (
                    <div className="flex w-full h-full justify-center">
                        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                            <p className="text-black text-2xl dark:text-gray-400">Artikel tidak tersedia</p>
                        </div>
                    </div>
                ) : isErrorArticle && !isFetchingArticle  ? (
                    <div className="w-full h-full flex justify-center">
                        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                            <Refetch refetch={refetchArticle}/>
                        </div>
                    </div>
                ) : (
                    <>
                        <ThumbnailBanner bgUrl={`${article.thumbnail}`}/>
                        <div className="pt-12 min-h-screen">
                            <h5 className="my-2 text-4xl text-center font-bold tracking-tight text-gray-900  dark:text-white">{article.title}</h5>
                            <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
                            <div className='flex flex-row w-full my-2 gap-1 justify-items-start justify-center'>
                                <div className="flex flex-row">
                                    <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">{ article.category.name }</span>
                                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                    <span className="self-center align-baseline text-xs font-medium text-black">{article.user.name}</span>
                                    <div className="self-center w-px h-4 mx-2 bg-gray-400"></div>
                                    <span className="self-center align-baseline text-xs font-medium text-black">{article.published_at}</span>
                                </div>
                            </div>
                            <RichTextContent className=""  content={article.content} />
                            <div className='flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end'>
                                <div className="flex flex-row">
                                    <p className="text-gray-500 dark:text-gray-400">Dilihat <strong className="font-semibold text-gray-900 dark:text-white">{article.views}</strong> kali</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </AsideContent>
      </div>
    </>
  );
};

export default ArticleDetail;
