import ArticleBanner from "../../components/banner/article";
import InfografisBanner from "../../components/banner/infografis";
import Hero from "../../components/banner/hero";
import App from "../../components/banner/app";
import Profile from "../../components/banner/profile";
import useSetting from "../../hooks/settings/useSettings";
import { useEffect } from "react";

const MainPage = () => {
  const { data: logo } = useSetting(
    `logo-${import.meta.env.VITE_VILLAGE_ID}`,
    {}
  );
  useEffect(() => {
    if (logo?.value?.regionEntity) {
      const tittle =
        logo?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim";
      document.title = tittle;
      const metaOgTittle = document.querySelector('meta[property="og:title"]');

      if (metaOgTittle) {
        metaOgTittle.setAttribute("content", tittle);
      }
    }
  }, [logo]);
  
  return (
    <>
      <Hero />
      <div className="w-full flex justify-center">
        <div className="w-full px-6 py-1 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-full overflow-hidden bg-slate-100 flex flex-col items-center content-center gap-12">
          <App />
          <Profile />
          <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-y-6 bg-gradient-to-b from-slate-100 via-blue-[#F3F9FB] to-blue-[#F3F9FB]">
            <ArticleBanner />
            <InfografisBanner />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
