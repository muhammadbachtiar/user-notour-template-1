import Lightbox from "react-spring-lightbox";
import { FaX } from "react-icons/fa6";
import PropTypes from "prop-types";

const LightboxImage = ({ data = [], isOpen, setIsOpen, currentIndex }) => {

    const transformedInfografisData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        src: item.link,
      }))
    : [];

  return (
    <>
         <Lightbox
            isOpen={isOpen}
            images={transformedInfografisData}
            currentIndex={currentIndex}
             renderHeader={() => (
                <div className="text-md sm:text-lg font-semibold flex w-full bg-black/20 justify-between px-3 py-1 items-center">
                    <h1 className="text-center leading-none tracking-tight">
                        {transformedInfografisData[currentIndex]?.title || "Title Not Available"}
                    </h1>
                    <button 
                    className="bg-transparent text-white text-md p-3 rounded-md transition duration-200 ease-in-out 
                                hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" 
                    onClick={() => { setIsOpen(false); }}
                    >
                        <FaX />
                    </button>

                </div>
            )}
             renderFooter={() => (
                <div className="flex w-full bg-black/20 text-white px-3 py-2 items-center flex-col">
                    <div className="mt-2 w-full max-h-32 overflow-y-auto px-2 py-1 rounded-md">
                        <p className="text-md text-center leading-relaxed">
                            {transformedInfografisData[currentIndex]?.description || "No description available"}
                        </p>
                    </div>
                </div>
            )}
            className="bg-black bg-opacity-65 text-white z-50"
        />
    </>
  );
};


export default LightboxImage;

LightboxImage.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            user_id: PropTypes.number,
            slug: PropTypes.string,
            published_at: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string
        })
    ), 
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    currentIndex: PropTypes.number
};