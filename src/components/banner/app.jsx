import Icons from '../../atoms/icons/icon';
import { Link } from 'react-router-dom';
import useSetting from '../../hooks/settings/useSettings';
import Refetch from '../../atoms/refetch';

const App = () => {

  const { data, isLoading, isError, isFetching, refetch } = useSetting(`service-${import.meta.env.VITE_VILLAGE_ID}`, {});
  const { data: appSetting,  isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`app-${import.meta.env.VITE_VILLAGE_ID}`, {});
 
  return (
        <section className="fixed block bottom-0 left-0 z-10 md:z-0 max-w-full w-full h-16 bg-white border-t dark:bg-gray-700 dark:border-gray-600 md:static md:grid md:grid-cols-8 md:gap-2 md:max-w-none md:w-auto md:h-auto md:bg-transparent md:border-0">
            <div className='hidden md:flex flex-col col-span-8 gap-2 mb-4 justify-items-center items-center '>
                 {
                    isSettingLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                                <div className=" h-8 w-32 rounded bg-gray-200"></div>
                                <div className="h-4 w-36 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    ) : isSettingError && !isSettingFetching  ? (
                        <Refetch refetch={refetchSetting} />
                    ) : (
                    <>
                        <span className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black">{ appSetting?.value?.title ?? "[Judul layanan belum diatur]"}</span>
                        <span className="self-center align-baseline text-md font-normal italic text-[#DDA853]">{appSetting?.value?.subTitle  ?? "[Sub judul layanan belum diatur]"}</span>
                    </>
                    )
                }
            </div>
            <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="md:pt-2 md:px-1 overflow-x-auto flex col-span-8 flex-row md:flex-wrap md:justify-center items-center h-full w-full font-medium md:gap-4">
                 {
                    isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching ? (
                        <div className="flex w-full col-span-4 animate-pulse space-x-3">
                            {Array.from({length:4}).map((_, index) => (
                                <div key={index} className="flex flex-col mx-2 bg-gray-200 rounded-md w-full h-14 md:h-56 md:w-56"></div>
                            ))}
                        </div>
                    ) : !isError && !isFetching && (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) ? (
                       <div className="flex justify-center w-full col-span-4 space-x-3">
                            <p className="text-black flex text-center items-center text-md dark:text-gray-400">Layanan tidak tersedia</p>
                        </div>
                    ) : isError && !isFetching  ? (
                        <Refetch refetch={refetch} />
                    ) : 
                    ((Array.isArray(data?.value) ? data.value : []) 
                        .sort((a, b) => a.order - b.order)
                        .map((item, index) => {
                            const IconComponent = Icons[item?.icon] ?? Icons.FaQuestion;
                            return item.link.startsWith("http") ? (
                                <a href={item.link} target='blank' key={index} rel="noopener noreferrer"  className="min-w-20 h-full w-full md:h-fit md:min-w-40 md:w-fit max-w-60 inline-flex flex-col items-center justify-center bg-[#F3F9FB] md:py-4 md:rounded-lg md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                                    <IconComponent className="min-w-3 min-h-3 mb-1 text-[#226597] md:w-20 md:h-20 md:mb-2 md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500" />
                                    <span className="text-xs text-[#226597] md:max-w-32 line-clamp-2 md:mb-2 md:text-sm text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">
                                        {item?.title}
                                    </span>
                                </a>
                            ) : (
                                <Link to={item.link} key={index} className="min-w-20 h-fit w-full md:h-fit md:min-w-40 md:w-full max-w-60 inline-flex flex-col items-center justify-center p-2 bg-[#F3F9FB] md:py-4 md:rounded-lg md:bg-white dark:hover:bg-gray-800 group hover:bg-[#113F67] hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-gray-400 focus:bg-[#113F67] transition-all transform duration-300 ease-in-out">
                                    <IconComponent className="min-w-3 min-h-3 mb-1 text-[#226597] md:w-20 md:h-20 md:mb-2 md:text-gray-800 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500" />
                                    <span className="text-xs text-[#226597] md:max-w-32 line-clamp-2 md:mb-2 md:text-sm text-center md:font-bold md:tracking-tight md:text-gray-900 group-hover:text-white group-focus:text-white dark:text-gray-400 dark:group-hover:text-blue-500">
                                        {item.title}
                                    </span>
                                </Link>
                            );
                        })
                    )
                }
            </div>
        </section>
  );
}

export default App;
