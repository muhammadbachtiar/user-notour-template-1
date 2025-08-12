import PropTypes from "prop-types";

const ThumbnailBanner = ({ bgUrl }) => {
  return (
    <section
      className={`relative bg-cover bg-bottom w-full flex justify-center items-end`}
    >
      <div className="relative z-10 aspect-video w-full">
        <img
          src={`${bgUrl}`}
          alt="thumbnail"
          className="object-cover h-full w-full"
        />
      </div>
    </section>
  );
};

export default ThumbnailBanner;

ThumbnailBanner.propTypes = {
  bgUrl: PropTypes.string.isRequired,
};
