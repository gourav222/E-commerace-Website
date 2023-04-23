import React, { useEffect } from "react";
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../../layouts/loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import {useAlert} from "react-alert";
const ProductDetails = () => {
  const dispatch = useDispatch();

  let params = useParams();

  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 20,
    value: product && product.ratings,
    isHalf: true,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetails">
            <div className="detailsBlock">
              <Carousel className="carousel" autoPlay={false}>
                {product &&
                  product.images.map((item, index) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${index} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            {product && (
              <div className="detailsBlock">
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>

                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({product.numberOfReviews} Reviews)</span>
                </div>

                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>

                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button>-</button>
                      <input value="1" type="number" />
                      <button>+</button>
                    </div>

                    <button className="AddToCart">Add to Cart</button>
                  </div>
                  <p className="status">
                    Status:{" "}
                    <b
                      className={product.stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>

                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>

                  <button className="submitReviews">Submit Review</button>
                </div>
              </div>
            )}
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          {product && product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews && product.reviews.map((review,index) => <ReviewCard key = {index} review = {review}/>)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
