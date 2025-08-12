import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useArticle from "../../hooks/contens/article/useList";
import useInfografis from "../../hooks/contens/infografis/useInfografis";
import Refetch from "../../atoms/refetch";
import LightboxImage from "../../atoms/Lightbox";
const SearchPage = () => {
  const { search } = useParams();
  const [searchValue, setSearchValue] = useState(search);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: articles,
    isLoading: IsArticleLoading,
    isFetching: IsArticleFetching,
    refetch: refetchArticle,
    isError: isArticleError,
  } = useArticle({ search: searchValue });
  const {
    data: infografies,
    isLoading: isInfografisLoading,
    isFetching: isInfografisFetching,
    refetch: refetchInfografis,
    isError: isInfografisError,
  } = useInfografis({ search: searchValue });

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-center w-full my-4">
      <div className="min-h-screen w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="col-span-6 grid grid-cols-6 gap-x-4 gap-y-8">
          <div className="relative w-full col-span-6">
            <input
              type="search"
              id="search-dropdown"
              value={searchValue}
              onChange={handleChange}
              className="block px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Cari judul ..."
            />
            <span
              type="submit"
              className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </span>
          </div>
          <div className="relative w-full hidden md:block md:col-span-2 lg:col-span-1">
            <div className="px-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
              <ul
                className="space-y-4"
                aria-labelledby="mega-menu-dropdown-button"
              >
                <li>
                  <a
                    href="#article"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                  >
                    Artikel
                  </a>
                </li>
                <li>
                  <a
                    href="#infografis"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                  >
                    Infografis
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative w-full col-span-6 grid grid-cols-6 gap-y-8 md:col-span-4 lg:col-span-5">
            <div className="col-span-6">
              <div className="col-span-6">
                <span
                  id="article"
                  className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black"
                >
                  Artikel
                </span>
              </div>
              <div className="col-span-6">
                <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
              </div>
              <div className="col-span-6">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 ">
                  {IsArticleLoading ||
                  ((!articles ||
                    !articles.pages[0] ||
                    articles.pages[0]?.data.length === 0) &&
                    IsArticleFetching) ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col py-3 animate-pulse bg-gray-50 hover:bg-gray-200"
                      >
                        <dd className="h-6 bg-gray-200 rounded w-3/4 mb-2"></dd>
                        <dt className="h-4 bg-gray-200 rounded w-1/2"></dt>
                      </div>
                    ))
                  ) : !isArticleError &&
                    !IsArticleFetching &&
                    (!articles ||
                      !articles.pages[0] ||
                      articles.pages[0]?.data.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-black text-2xl dark:text-gray-400">
                        Artikel tidak ditemukan
                      </p>
                    </div>
                  ) : isArticleError && !IsArticleFetching ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Refetch refetch={refetchArticle} />
                    </div>
                  ) : (
                    articles?.pages[0].data.map((article, index) => (
                      <Link
                        key={article.id}
                        to={`/article/${article.slug}`}
                        tabIndex={1}
                        className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full"
                      >
                        <div
                          className={`flex flex-col py-3 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          } hover:bg-gray-200 transition-colors duration-200`}
                        >
                          <dt className="mb-1 font-semibold text-gray-900 md:text-lg dark:text-gray-400">
                            <span className="block">{article.title}</span>
                          </dt>
                          <dd className="text-md line-clamp-3 text-gray-500 dark:text-white">
                            {article.description}
                          </dd>
                        </div>
                      </Link>
                    ))
                  )}
                </dl>
              </div>
            </div>
            <div className="col-span-6">
              <div className="col-span-6">
                <span
                  id="infografis"
                  className="self-center align-baseline text-2xl leading-3 tracking-tighter font-semibold uppercase text-black"
                >
                  Infografis
                </span>
              </div>
              <div className="col-span-6">
                <hr className="h-px my-3 bg-gray-200 border-1 dark:bg-gray-700"></hr>
              </div>
              <div className="col-span-6">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  {isInfografisLoading ||
                  ((!infografies || infografies.length === 0) &&
                    isInfografisFetching) ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col py-3 animate-pulse bg-gray-50 hover:bg-gray-200"
                      >
                        <dd className="h-6 bg-gray-200 rounded w-3/4 mb-2"></dd>
                        <dt className="h-4 bg-gray-200 rounded w-1/2"></dt>
                      </div>
                    ))
                  ) : !isInfografisError &&
                    !isInfografisFetching &&
                    (!infografies || infografies.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-black text-2xl dark:text-gray-400">
                        Infografis tidak ditemukan
                      </p>
                    </div>
                  ) : isInfografisError && !isInfografisFetching ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Refetch refetch={refetchInfografis} />
                    </div>
                  ) : (
                    <>
                      {infografies.map((infografis, index) => (
                        <div
                          key={infografis.id}
                          onClick={() => {
                            setIsOpen(true);
                            setCurrentIndex(index);
                          }}
                          className={`flex flex-col py-3 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          } hover:bg-gray-200 transition-colors duration-200`}
                        >
                          <dt className="mb-1 font-semibold text-gray-900 md:text-lg dark:text-gray-400">
                            <span className="block">{infografis.title}</span>
                          </dt>
                          <dd className="text-md line-clamp-3 text-gray-500 dark:text-white">
                            {infografis.description}
                          </dd>
                        </div>
                      ))}
                      <LightboxImage
                        data={infografies}
                        isOpen={isOpen}
                        currentIndex={currentIndex}
                        setIsOpen={setIsOpen}
                      />
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
