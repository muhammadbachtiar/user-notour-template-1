import Slider from "react-slick";
import PropTypes from "prop-types";
import ArticleCard from "../ArticleCard";
import { Link } from "react-router-dom";

const SliderCard = ({data  = [{src:"", alt:""}]})=> {


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
    
const settings = {
    dots: false,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
        <div
          style={{
            position: 'unset',
            padding: "0 10px"
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
};

SamplePrevArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};

SampleNextArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};
  
return (
        <>
          <Slider {...settings}>
            {data.map((card) => 
              <Link to={`/article/${card.slug}`}  key={card.slug}>
                  <ArticleCard thumbnail={card.thumbnail} title={card.title} description={card.description} category={card.category.name} published_at={card.published_at} /> 
              </Link>    
            )}
          </Slider>
        </>
      )
}

SliderCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            thumbnail: PropTypes.string,
            category_id: PropTypes.number,
            published_at: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired,
};

export default SliderCard;