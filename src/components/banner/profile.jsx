import useStaticPage from '../../hooks/settings/useStaticPage';
import Refetch from '../../atoms/refetch';
import RichTextContent from '../../atoms/RichTextContent';
import TabGroupCard from '../../atoms/TabGroup';

export default function Profile() {

  const { data: welcomeMessage, isLoading: isWellcomeMessageLoading, isFetching: isWellcomeMessageFetching, refetch: refetchWelcomeMessage, isError: isWellcomeMessageError } = useStaticPage({}, `wellcome-message-${import.meta.env.VITE_VILLAGE_ID}`);
  const { data: villageProgram, isLoading: isvillageProgramLoading, isFetching: isvillageProgramFetching, refetch: refetchVillageProgram, isError: isvillageProgramError } = useStaticPage({}, `village-program-${import.meta.env.VITE_VILLAGE_ID}`);

  const TabListName = [
    {
      name: 'Kata Sambutan',
      content: <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="bg-slate-100 dark:bg-gray-700 rounded-2xl min-h-[300px] max-h-screen flex items-center justify-center overflow-y-scroll">
                  {isWellcomeMessageLoading || (!welcomeMessage || Object.keys(welcomeMessage || {}).length === 0) && isWellcomeMessageFetching ? (
                        <div className="w-full max-w-md p-4">
                          <div className="flex flex-col gap-4 p-4 dark:bg-gray-600 rounded-md animate-pulse">
                            <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-6 w-2/4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-500 rounded"></div>
                          </div>
                        </div>
                    ) : !isWellcomeMessageError && !isWellcomeMessageFetching && (!welcomeMessage || Object.keys(welcomeMessage || {}).length === 0)? (
                        <div className="flex col-span-6 w-full min-h-[300px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-2xl text-center dark:text-gray-400">Kata sambutan tidak tersedia</p>
                            </div>
                        </div>
                    ) : isWellcomeMessageError && !isWellcomeMessageFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[300px] justify-center">
                          <Refetch refetch={refetchWelcomeMessage} />
                        </div>
                    ) : (
                      <RichTextContent 
                        content={welcomeMessage?.content ?? 'Kata sambutan tidak tersedia'} 
                      />
                    )}
              </div>
    },
    {
      name: 'Program',
      content: <div style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="bg-slate-100 dark:bg-gray-700 rounded-2xl min-h-[300px] flex justify-center max-h-screen overflow-y-scroll">
                    {isvillageProgramLoading || isvillageProgramFetching ? (
                        <div className="w-full max-w-md p-4">
                          <div className="flex flex-col gap-4 p-4 dark:bg-gray-600 rounded-md animate-pulse">
                            <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-6 w-2/4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-500 rounded"></div>
                          </div>
                        </div>
                    ) : !isvillageProgramError && !isvillageProgramFetching && (!villageProgram || Object.keys(villageProgram || {}).length === 0) ? (
                        <div className="flex col-span-6 w-full min-h-[300px] justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-black text-center text-2xl dark:text-gray-400">Program tidak tersedia</p>
                            </div>
                        </div>
                    ) : isvillageProgramError && !isvillageProgramFetching  ? (
                        <div className="flex col-span-6 w-full min-h-[300px] justify-center">
                          <Refetch refetch={refetchVillageProgram} />
                        </div>
                    ) : (
                      <RichTextContent 
                        content={villageProgram?.content ?? 'Program tidak tersedia'} 
                       />
                    )}
              </div>
    }
  ]

  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="max-w-full w-full flex flex-col align-middle justify-center dark:bg-gray-700 dark:border-gray-600">
          <TabGroupCard tabList={TabListName}/>
      </div>
    </section>
  );
}
