import React from "react";
import ReactStars from "react-rating-stars-component";
import profile from "../../../images/profile.png";
import "./productDetails.css";
const ReviewCard = ({review}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 20,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profile} alt="" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
