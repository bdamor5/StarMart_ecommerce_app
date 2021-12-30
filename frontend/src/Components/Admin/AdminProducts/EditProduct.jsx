import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../redux/actions/productActions";
import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";
import { UPDATE_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import Loader from "../../Loader/Loader";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const categories = [
    "FootWears",
    "Smart Phones",
    "Clothings",
    "Smart TVs",
    "Appliances",
  ];

  //disable submit button
  const [disable, setDisable] = useState(false);

  //get product details
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  //handle image upload
  const productImagesChange = (e) => {
    if (images.length > 3) {
      alert.info("Min 4 images can be added");
    } else {
      const allImages = Array.from(e.target.files);

      allImages.forEach((curr) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(curr);
      });
    }
  };

  //handle submit
  const editProductHandler = (e) => {
    e.preventDefault();

    if (name.length < 4) {
      alert.info("Product name should be of min 4 characters");
    } else if (Stock < 1) {
      alert.info("Stock must be greater than 0");
    } else if (price < 200) {
      alert.info("Price must be greater than ₹200");
    } else if (description < 5) {
      alert.info("Description should be of min 5 characters");
    } else {
      setDisable(true);

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("Stock", Stock);

      images.forEach((curr) => {
        myForm.append("images", curr);
      });

      dispatch(updateProduct(params.id, myForm));
    }
  };

  const { isUpdated, error: updateError } = useSelector(
    (state) => state.productAdmin
  );

  useEffect(() => {
    if (product && product._id !== params.id) {
      dispatch(getProductDetails(params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      navigate("/admin/products");
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      navigate("/admin/products");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Products Updated");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, params.id, product, error, updateError, isUpdated, alert]);

  return (
    <>
      <Helmet>
        <title>Update Product</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginregister_container">
          <div
            className="switch"
            style={{
              marginTop: "1px",
              marginBottom: "10px",
              backgroundColor: "yellowgreen",
            }}
          >
            <h4 style={{ color: "white" }}>Update Product</h4>
          </div>
          <Breadcrumbs aria-label="breadcrumb" separator=">" className="bc">
            <div className="bc_item" onClick={() => navigate("/admin")}>
              Dashboard
            </div>
            <div
              className="bc_item"
              onClick={() => navigate("/admin/products")}
            >
              All Products
            </div>
            <div className="bc_lastitem">Update Product</div>
          </Breadcrumbs>
          <div
            className="loginregister_box"
            style={{ marginTop: "-30px", paddingBottom: "20px" }}
          >
            <form
              className="registerForm"
              encType="multipart/form-data"
              onSubmit={editProductHandler}
            >
              <div className="registerName">
                <SpellcheckIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="registerName">
                <AttachMoneyIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="registerName">
                <AccountTreeIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="registerName">
                <StorageIcon style={{ color: "white", paddingRight: "1%" }} />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile" className="registerAvatar">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={productImagesChange}
                  multiple
                  //as we are selecting multiple images
                />
              </div>

              {oldImages && oldImages.length > 0 ? (
                <div id="createProductFormImage" className="registerName">
                  {oldImages && oldImages.map((image, index) => (
                      <img key={index} className="avatarPreview" src={image.url} alt="Product Preview"/>
                    ))}
                  <br />
                  {oldImages && oldImages.length > 0 && (
                    <Button
                      className="loginBtn"
                      onClick={() => {
                        setOldImages([]);
                      }}
                      style={{ width: "100%", margin: "0 auto" }}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              ) : (
                <div id="createProductFormImage" className="registerName">
                  {images &&
                    images.map((image, index) => (
                      <img key={index} className="avatarPreview" src={image} alt="Product Preview" />
                    ))}
                  <br />
                  {images.length > 0 && (
                    <Button
                      className="loginBtn"
                      onClick={() => {
                        setImages([]);
                      }}
                      style={{ width: "100%", margin: "0 auto" }}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              )}

              <div
                className="registerName"
                style={{ display: "flex", alignItems: "center" }}
              >
                <DescriptionIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="25"
                  rows="1"
                ></textarea>
              </div>

              {disable ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<RefreshIcon />}
                  variant="outlined"
                  className="processingBtn"
                >
                  Updating
                </LoadingButton>
              ) : (
                <Button
                  id="createProductBtn"
                  type="submit"
                  className="loginBtn"
                >
                  Update
                </Button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
