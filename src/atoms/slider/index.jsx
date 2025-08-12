import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useInfografis from "../../hooks/contens/infografis/useInfografis";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState } from "react";
import LightboxImage from "../Lightbox";
import Refetch from "../refetch";

const SliderCard = ({
  useButton = false,
  useDots = false,
  slideToShow = 1,
}) => {
  const { data, isLoading, isFetching, refetch, isError } = useInfografis();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  let settings;

  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
      appendDots: (dots) => (
        <div
          style={{
            position: "unset",
            padding: "0 10px",
          }}
        >
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
      ),
    }),
  };

  if (slideToShow > 1) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 664,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      nextArrow: !useButton ? <SampleNextArrow /> : undefined,
      prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
      ...(useDots && {
        appendDots: (dots) => (
          <div
            style={{
              position: "unset",
              padding: "0 10px",
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        ),
      }),
    };
  }

  if (slideToShow > 3) {
    settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 4,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      nextArrow: !useButton ? <SampleNextArrow /> : undefined,
      prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
      ...(useDots && {
        appendDots: (dots) => (
          <div
            style={{
              position: "unset",
              padding: "0 10px",
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        ),
      }),
    };
  }

  SamplePrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  return (
    <div className="w-full p-3">
      <Slider {...settings}>
        {isLoading ||
        (isFetching &&
          (!data || (Array.isArray(data) && data.length === 0))) ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative px-3 animate-pulse">
              <div className="min-h-96 w-80 flex-1 rounded-2xl bg-gray-200"></div>
            </div>
          ))
        ) : !isError &&
          !isFetching &&
          (!data || (Array.isArray(data) && data.length === 0)) ? (
          <div className="mb-4 col-span-8 w-full">
            <p className="text-black text-md min-h-52 flex items-center justify-center dark:text-gray-400">
              Infografis tidak tersedia
            </p>
          </div>
        ) : isError && !isFetching ? (
          <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
            <Refetch refetch={refetch} />
          </div>
        ) : (
          data.map((card, index) => {
            return (
              <div
                key={card.slug}
                tabIndex={1}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentIndex(index);
                }}
              >
                <div className="flex justify-center relative group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out">
                  <figure className="h-full w-full max-w-md max-h-96 aspect-[4/5]">
                    <img
                      className="h-full w-full object-cover rounded-lg cursor-pointer"
                      src={card.link}
                      alt="infografis"
                    />
                    <figcaption className="mt-2 text-sm text-center line-clamp-2 text-[#F3F9FB] dark:text-gray-400">
                      {card.title}
                    </figcaption>
                  </figure>
                </div>
              </div>
            );
          })
        )}
      </Slider>
      <LightboxImage
        data={data}
        isOpen={isOpen}
        currentIndex={currentIndex}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

SliderCard.propTypes = {
  useDots: PropTypes.bool,
  useButton: PropTypes.bool,
  slideToShow: PropTypes.number,
};

export default SliderCard;
