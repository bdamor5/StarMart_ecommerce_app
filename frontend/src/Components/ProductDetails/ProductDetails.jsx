import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import Helmet from "react-helmet";
import { Rating } from "@mui/lab";
import { Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  getProductDetails,
  clearErrors,
  getBadgeCount
} from "../../redux/actions/productActions";
import Loader from "../Loader/Loader";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReviewCard from "../ReviewCard/ReviewCard";
import { submitNewReview } from "../../redux/actions/reviewActions";
import { SUBMIT_REVIEW_RESET } from "../../redux/constants/reviewConstants";

const ProductDetails = () => {
  //will contain the image selected from the small left image section
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal Box style
  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  //rating
  const [rating, setRating] = useState();

  //comment
  const [comment, setComment] = useState("");

  const {isAuthenticated} = useSelector(state => state.user)

  //submit review
  const handleSubmit = () => {
    if(isAuthenticated === false){
      alert.info('Please Log in to write a review')
    }else if (!rating || !comment) {
      alert.info("Fill All The Fields");
    } else {
      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", params.id);

      dispatch(submitNewReview(myForm));

      handleClose();
    }
  };

  const { success, reviewError } = useSelector((state) => state.submitReview);

  useEffect(() => {
    if (error) {
      alert.error("Invalid Resource Id");
      dispatch(clearErrors());
      navigate("/");
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (!product) {
      navigate("/");
    }

    if (success) {
      alert.success("Review Submitted!");

      dispatch({ type: SUBMIT_REVIEW_RESET });
    }

    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error, reviewError, success]);

  //add to cart
  const [qty, setQty] = useState(1);

  const handleQty = (num) => {
    let newQty = qty;

    setDisable(false)

    if (num === 1) {
      newQty++;

      if(newQty >= product.Stock){ 
        setQty(product.Stock)
        alert.info('Out Of Stock')

      }else setQty(newQty);
    } else {
      newQty--;
      if (newQty < 1) setQty(1);
      else setQty(newQty);
    }
  };

  //to disable add to cart btn
  const [disable , setDisable] = useState(false)

  //add to cart
  const handleCart = () => {

    //the item to be added to cart
    let item = {
      productId: params.id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.Stock,
      quantity: qty,
    };

    var cartItems = [];

    //if cartItems key is not present in local storage
    if (localStorage.getItem("cartItems") === null) {
      cartItems.push(item);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {

      //fetching the cartItems from LS
      cartItems = JSON.parse(localStorage.getItem("cartItems"));

      //searching for the 'item' in cartItems
      const itemExist = cartItems.find(
        (curr) => curr.productId === item.productId
      );

      //if present
      if (itemExist) {

        //then simply update the old 'item' with new 'item'
        cartItems = cartItems.map((curr) =>
          curr.productId === item.productId ? item : curr
        );
      } else {

        //if not present then simply push the 'item' in the cartItems array
        cartItems.push(item);
      }

      //will save the cartItems array in LS
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    alert.success("Item Added To Cart");

    setDisable(true)
    dispatch(getBadgeCount())
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name}`}</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="page_container">
          <div className="productdetails_container">
            <div className="productdetails_left">
              <div className="productdetails_imagedisplay">
                {product.images &&
                  product.images.map((curr) => (
                    <div className="imageblock">
                      <img
                        src={curr.url}
                        alt="productimage"
                        onMouseEnter={() => setSelectedImage(curr.url)}
                        onMouseLeave={() => setSelectedImage("")}
                      />
                      {/* on mouse enter we will set the selectedimage to the that image
                  and when on mouse leave we will set it back to empty */}
                    </div>
                  ))}
              </div>

              <div className="productdetails_carousel">
                <Carousel swipe="true" autoPlay="true">
                  {product.images &&
                    product.images.map((curr) => (
                      <div className="productdetails_carouselimage">
                        <img
                          src={selectedImage ? selectedImage : curr.url}
                          alt="productimage"
                        />
                        {/* when selected image state is not empty then render it else display curr */}
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>

            <div className="productdetails_right">
              <h3>{product && product.name} <br/> <span style={{color:'grey',fontSize:'13px'}}>#{product && product._id}</span> </h3>

              <div className="productdetails_review">
                <div className="productdetails_ratings">
                  <Rating
                    name="ratings-product-readonly"
                    value={product && product.ratings}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                </div>

                <div className="productdetails_numofreviews">
                  {product.numOfReviews !== 1
                    ? `(${product && product.numOfReviews} reviews)`
                    : `(${product && product.numOfReviews} review)`}
                </div>
              </div>

              <div className="productdetails_price">{`₹${
                product && product.price
              }`}</div>

              <div className="productdetails_cart">
                <div>
                  <button
                    className={
                      product && product.Stock > 0 ? "qtybtn" : "qtybtnofs"
                    }
                    disabled={product && product.Stock === 0 && "true"}
                    onClick={() => handleQty(2)}
                  >
                    {" "}
                    <span>-</span>
                  </button>
                  <input
                    type="number"
                    value={product && product.Stock === 0 ? "0" : qty}
                    className="qtyinput"
                    readOnly
                  />
                  <button
                    className={
                      product && product.Stock > 0 ? "qtybtn" : "qtybtnofs"
                    }
                    disabled={product && product.Stock === 0 && "true"}
                    onClick={() => handleQty(1)}
                  >
                    <span>+</span>
                  </button>
                </div>
                <button
                  disabled={product && product.Stock === 0 ? "true" : disable}
                  className={
                    product && product.Stock > 0 && !disable
                      ? "addtocartbtn"
                      : "addtocartbtndisabled"
                  }
                  onClick={handleCart}
                >
                  Add To Cart
                </button>
              </div>

              <div className="stock">
                <p>
                  Status :{" "}
                  <span className={!product && product.Stock && "OutOfStock"}>
                    {product && product.Stock ? "In Stock" : "Out Of Stock"}
                  </span>{" "}
                </p>
              </div>

              <div className="productdetails_description">
                <p>
                  <span>Description : </span>
                  {product && product.description}
                </p>
              </div>

              <button className="reviewbtn" onClick={handleOpen}>
                Submit A Review
              </button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="dialog_box_review" sx={style}>
                  <h3>Submit A Review</h3>

                  {/* to submit ratings */}
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    size="large"
                    value={rating}
                    precision={0.5}
                  />

                  {/* to add comment */}
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="dialog_buttons">
                    <Button className="reviewBtn" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button className="reviewBtn" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="review_container">
            <h4>All Reviews</h4>
            {product && product.reviews && product && product.reviews[0] ? (
              <div className="reviews">
                {product &&
                  product.reviews.map((curr) => <ReviewCard review={curr} />)}
              </div>
            ) : (
              <h5 className="noreviews" style={{color:'grey',paddingBottom:'5%'}}>No Reviews</h5>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
