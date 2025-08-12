import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useSetting from "../../hooks/settings/useSettings";
import Refetch from "../refetch";
import { useEffect } from "react";

const Logo = ({textColor="text-[#F3F9FB]", hoverBgColor="bg-[#226597]"}) => {

  const { data: logo, isLoading, isError, isFetching, refetch } = useSetting(`logo-${import.meta.env.VITE_VILLAGE_ID}`, {});
    useEffect(() => {
        if (logo?.value?.imageUrl) {
            const favicon = document.querySelector("link#dynamic-favicon");

            if (favicon) {
                favicon.href = logo.value.imageUrl;
                favicon.type = "image/png"; 
            } else {
                const newFavicon = document.createElement("link");
                newFavicon.rel = "icon";
                newFavicon.type = "image/png";
                newFavicon.href = logo.value.imageUrl;
                newFavicon.id = "dynamic-favicon";
                document.head.appendChild(newFavicon);
            }

            const ogImageMeta = document.querySelector('meta[property="og:image"]');
            if (ogImageMeta) {
                ogImageMeta.setAttribute("content", logo.value.imageUrl);
            } else {
                const newMeta = document.createElement("meta");
                newMeta.setAttribute("property", "og:image");
                newMeta.setAttribute("content", logo.value.imageUrl);
                document.head.appendChild(newMeta);
            }
        }
        }, [logo]);
  return (
    <>
        {isLoading ? (
            <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
            ) : isError && !isFetching  ? (
                <div className="flex flex-col items-center justify-center gap-2">
                    <Refetch refetch={refetch}/>
                </div>
            ) : (
                 <Link to={"/"} className={`flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:${hoverBgColor} hover:scale-105 transition transform duration-300 ease-in-out`}>
                    <img src={logo?.value?.imageUrl ?? '/unavailable-image.png'} className="h-10" alt="App Logo"></img>
                    <div className='flex flex-col gap-2'>
                        <span className={`self-start align-baseline text-md leading-3 tracking-tighter font-semibold uppercase ${textColor}`}>{logo?.value?.regionEntity ?? '[Judul logo belum diatur]'} </span>
                        <span className={`self-start align-baseline text-xs leading-3 font-normal italic ${textColor}`}>{(logo?.value?.regionDescription) ??  "[Sub judul logo belum diatur]"} </span>
                    </div>
                </Link>
            )
        }
    </>
  );
};

Logo.propTypes = {
    textColor: PropTypes.string,
    hoverBgColor: PropTypes.string
};

export default Logo;