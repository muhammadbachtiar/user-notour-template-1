import { Link } from "react-router-dom";
import SliderCard from "../../atoms/slider/sliderCard";
import Refetch from "../../atoms/refetch";
import useArticle from "../../hooks/contens/article/useList";
import useSetting from "../../hooks/settings/useSettings";

const ArticleBanner = () => {
    
    const { data: articles, isLoading, isFetching, refetch, isError } = useArticle({"page_size": 6, "order": "desc", "by": "published_at"});
    const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${import.meta.env.VITE_VILLAGE_ID}`, {});
    
 const backgroundStyle = setting?.value?.imageUrl
  ? { backgroundImage: `url(${setting.value.imageUrl})` }
  : { backgroundImage: `url(/unavailable-image.png)` };
    
  return (
       <>
        <div style={backgroundStyle} className={`relative min-h-[24rem] bg-none lg:bg-cover lg:bg-bottom rounded-s-md col-span-4 lg:col-span-3 lg:pt-4 px-4 grid grid-cols-6`}>    
            <div className="absolute inset-0 bg-slate-100 lg:bg-white/80 rounded-s-md"></div>
            <div className="relative z-0 col-span-6 grid grid-cols-6 gap-x-8 gap-y-4">
                <div className="col-span-6 grid grid-cols-6  gap-8 justify-between">
                    <div className="col-span-3">
                        {
                            isSettingLoading ? (
                                <div className="flex animate-pulse space-x-3 w-full min-h-min ">
                                    <div className="h-5 w-full flex-1 bg-gray-300"></div>
                                </div>
                            ) : isSettingError && !isSettingFetching  ? (
                                <Refetch refetch={refetchSetting} />
                            ) : (
                                <span className="self-center align-baseline text-xl sm:text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">{setting?.value?.title ?? "[Judul artikel belum diatur]"}</span>
                            )
                        }
                    </div>
                    <div className="col-span-3 text-end">
                        <Link to={"/article"} className="inline-flex text-sm sm:text-xl font-medium items-center text-center text-[#DDA853] hover:text-[#b48943] hover:underline focus:text-[#b48943] focus:underline">
                            Lihat selengkapnya
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="col-span-6 justify-items-center">
                    {   
                        isLoading || (!Array.isArray(articles?.pages?.[0]?.data) || articles.pages[0].data.length === 0) && isFetching ? (
                            <div className="h-auto w-full grid grid-cols-6 gap-4 px-2 md:px-8">
                                {Array.from({ length: window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1 }).map((_, index) => (
                                    <div key={index} className="col-span-6 md:col-span-3 lg:col-span-2 px-6 md:px-3 w-full">
                                        <div className="flex flex-col gap-2 p-4 rounded-md animate-pulse">
                                            <div className="h-24 w-full bg-gray-400 rounded"></div>
                                            <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                                            <div className="h-3 w-2/4 bg-gray-400 rounded"></div>
                                            <div className="h-3 w-2/4 bg-gray-400 rounded"></div>
                                            <div className="h-3 w-1/3 bg-gray-400 rounded"></div>
                                            <div className="h-3 w-1/3 bg-gray-400 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : !isError && !isFetching && (!Array.isArray(articles?.pages?.[0]?.data) || articles.pages[0].data.length === 0) ? (
                            <div className="flex col-span-6 w-full h-full justify-center">
                                <div className="flex flex-col items-center justify-top gap-2">
                                    <p className="text-black text-2xl dark:text-gray-400">Artikel tidak tersedia</p>
                                </div>
                            </div>
                        ) : !isFetching && isError ? (
                            <div className="flex flex-col items-center justify-center gap-2">
                               <Refetch refetch={refetch}/>
                            </div>
                        ) : (
                            <>
                               <div className="max-w-sm sm:max-w-full w-full overflow-hidden dark:bg-gray-800 dark:border-gray-700"> <SliderCard data={articles.pages[0].data} /></div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
       </>
  );
};

export default ArticleBanner;