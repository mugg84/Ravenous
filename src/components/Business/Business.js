import React from "react";
import "./Business.css";
import PropTypes from "prop-types";

const Business = ({
  business: {
    url,
    imageSrc,
    name,
    googleMaps,
    address,
    city,
    state,
    zipCode,
    category,
    rating,
    reviewCount,
  },
}) => (
  <div className="Business">
    <div className="image-container">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} alt="" />
      </a>
    </div>
    <h2>{name}</h2>
    <div className="Business-information">
      <div className="Business-address">
        <a href={googleMaps} target="_blank" rel="noopener noreferrer">
          <p>{address}</p>
        </a>
        <p>{city}</p>
        <p>{`${state} ${zipCode}`}</p>
      </div>
      <div className="Business-reviews">
        <h3>{category.toUpperCase()}</h3>
        <h3 className="rating">{`${rating} stars`}</h3>
        <p>{`${reviewCount} reviews`}</p>
      </div>
    </div>
  </div>
);

Business.defaultProps = {
  url: "",
  image: "",
  name: "",
  googleMaps: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  category: "",
  rating: "",
  reviewCount: "",
};

Business.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  googleMaps: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  reviewCount: PropTypes.string.isRequired,
};

export default Business;
