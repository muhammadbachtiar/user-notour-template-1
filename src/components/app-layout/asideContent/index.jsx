import useArticle from "../../../hooks/contens/article/useList";
import PropTypes from "prop-types";
import Refetch from "../../../atoms/refetch";
import { Link } from "react-router-dom";
import SliderInfografis from "../../../atoms/slider";

export default function AsideContent({ children }) {
  const {
    data: articles,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useArticle({ page_size: 5, order: "desc", by: "views" });

  return (
    <div className="flex w-full justify-center py-4">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-stretch md:flex-row">
        <main className="flex-1 min-w-0 md:pe-2">
          <div className="space-y-6">
            <div className="mb-8">{children}</div>
          </div>
        </main>
        <aside className="w-full md:w-72 lg:w-80 md:ps-2 lg:sticky lg:top-0 border-gray-300 md:border-l">
          <div className="space-y-6 sticky top-4 self-start h-fit">
            <div>
              <h2 className="text-xl font-bold text-[#DDA853] mb-4 pb-2 border-gray-300 border-b">
                Artikel Populer
              </h2>
              <ul className="space-y-4">
                {isLoading ||
                ((!articles ||
                  !articles.pages[0] ||
                  articles.pages[0]?.data.length === 0) &&
                  isFetching) ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="flex animate-pulse">
                      <div className="mr-3 min-w-32 relative group mb-3">
                        <div className="w-40 md:w-30 rounded-sm shadow-lg bg-gray-200 h-20"></div>
                        <div className="absolute w-40 md:w-30 inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                      </div>
                    </li>
                  ))
                ) : !isError &&
                  !isFetching &&
                  (!articles ||
                    !articles.pages[0] ||
                    articles.pages[0]?.data.length === 0) ? (
                  <div className="flex min-h-52 mb-4 justify-center items-center col-span-8 w-full">
                    <p className="text-black text-center text-md dark:text-gray-400">
                      Artikel tidak tersedia
                    </p>
                  </div>
                ) : isError && !isFetching ? (
                  <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                    <Refetch refetch={refetch} />
                  </div>
                ) : (
                  articles?.pages[0].data.map((article) => (
                    <Link key={article.id} to={`/article/${article.slug}`}>
                      <li className="flex my-2">
                        <div className="mr-3 max-w-40 min-w-40 md:max-w-28 md:min-w-28 w-full relative group">
                          <img
                            className="aspect-video max-w-40 md:max-w-28 max-h-24 h-full w-full rounded-sm shadow-lg object-cover"
                            src={article.thumbnail || ""}
                            alt="Article Thumbnail"
                          />
                          <div className="absolute w-40 md:w-28 inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        </div>
                        <p className="text-md line-clamp-3 font-semibold hover:text-[#DDA853] ">
                          {article.title}
                        </p>
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#DDA853] mb-4 pb-2 border-gray-300 border-b">
                Infografis
              </h2>
              <div className="relative min-h-[24rem] flex justify-center items-center">
                <section className="relative w-full flex justify-center items-center">
                  <div className="max-w-full w-full grid grid-cols-9 gap-2 dark:bg-gray-700 dark:border-gray-600">
                    <div className="col-span-9 max-w-full w-full justify-center overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                      <SliderInfografis useButton={false} useDots={false} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

AsideContent.propTypes = {
  children: PropTypes.node.isRequired,
};
