import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../../atoms/refetch";
const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isFetching, refetch, isError } = useSetting(
    `hero-${import.meta.env.VITE_VILLAGE_ID}`,
    {}
  );
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
  if (data?.value?.title && data?.value?.description) {
    const description =`${data?.value?.title}  ${data?.value?.description}`;

    const metaOgDescription = document.querySelector('meta[property="og:description"]');

    if (metaOgDescription) {
      metaOgDescription.setAttribute("content", description);
    }
  }
}, [data]);

  return (
    <section className="relative h-dvh w-full flex justify-center items-center">
      {isLoading ? (
        <div className="flex animate-pulse space-x-3 w-full min-h-min ">
          <div className="h-dvh w-full flex-1 bg-gray-300"></div>
        </div>
      ) : isError && !isFetching ? (
        <Refetch refetch={refetch} />
      ) : (
        <>
          {data?.value?.videoUrl?.match(/\.(mp4|webm|ogg)$/i) &&
          data?.value?.videoUrl ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={data?.value?.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={data?.value?.videoUrl || "/unavailable-image.png"}
              alt="Hero Background"
              className="object-cover absolute top-0 left-0 w-full h-full"
              sizes="100vw"
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
          <div className="w-full flex justify-center">
            <div className="relative w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-center sm:py-16 lg:py-32">
              <h1 className="mb-4 text-3xl sm:text-5xl font-bold text-white lg:text-6xl">
                {data?.value?.title ?? "[Judul hero belum diatur]"}
              </h1>
              <p className="mb-7 text-sm sm:text-base font-normal tracking-tight leading-5 text-white lg:text-xl sm:px-16 xl:px-24">
                {data?.value?.description ?? "[Deskripsi hero belum diatur]"}
              </p>
              <div className="flex flex-col justify-center items-center px-6 sm:gap-2 space-y-4 sm:justify-center sm:space-y-0 lg:px-36 md:gap-6">
                <div className="flex w-full">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      onChange={handleChange}
                      className="block py-3 px-3 sm:px-5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-3xl rounded-s-3xl border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Apa yang Anda cari?"
                      required
                    />
                    {searchValue ? (
                      <Link to={`/search/${searchValue}`}>
                        <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </span>
                      </Link>
                    ) : (
                      <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
