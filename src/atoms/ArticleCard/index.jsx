import PropTypes from "prop-types";

const ArticleCard = ({
  thumbnail,
  title,
  description,
  category,
  published_at,
}) => {
  return (
    <>
      <div className="px-0 sm:pe-3 group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out">
        <div className="relative overflow-hidden rounded-sm w-full group">
          <img
            className="w-full h-full object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out"
            src={thumbnail}
            alt=""
            style={{ aspectRatio: "16/9" }}
          />
        </div>
        <div className="p-1">
          <div className="flex flex-row col-span-8 my-2 gap-1 justify-items-start items-start">
            <span className="self-center align-baseline text-base font-semibold uppercase text-[#DDA853]">
              {category}
            </span>
            <div className="self-center w-px h-4 bg-gray-400"></div>
            <span className="self-center align-baseline text-xs font-medium text-black">
              {published_at}
            </span>
          </div>
          <h5 className="my-2 leading-5 text-lg line-clamp-3 font-bold tracking-tight text-gray-900  dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-sm line-clamp-3 leading-5 text-gray-500 lg:text-gray-800 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;

ArticleCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  published_at: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
