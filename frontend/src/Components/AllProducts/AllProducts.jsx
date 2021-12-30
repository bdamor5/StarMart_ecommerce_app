import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import Helmet from "react-helmet";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  clearErrors,
} from "../../redux/actions/productActions";
import ProductCardProducts from "../ProductCard/ProductCardProducts";
import SkeletonProducts from "../SkeletonProducts/SkeletonProducts";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const [category, setCategory] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [ratingsRange, setRatingsRange] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortRatings, setSortRatings] = useState("");

  const categories = [
    "FootWears",
    "Smart Phones",
    "Clothings",
    "Smart TVs",
    "Appliances",
  ];

  const priceRangeMarks = [
    {
      value: 10000,
      label: "10K",
    },
    {
      value: 20000,
      label: "20K",
    },
    {
      value: 30000,
      label: "30K",
    },
    {
      value: 40000,
      label: "40K",
    },
  ];

  const ratingsRangeMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.getProducts);

  //pagination
  if (Number.isInteger(productsCount / resultPerPage)) {
    var paginationCount = productsCount / resultPerPage;
  } else {
    var paginationCount = Math.floor(productsCount / resultPerPage) + 1;
  }

  //search
  const params = useParams();

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      alert.error("An Error Occured, Please Try Again");
      dispatch(clearErrors());
    }

    dispatch(
      getAllProducts(
        keyword,
        currentPage,
        priceRange,
        category,
        ratingsRange,
        sortPrice,
        sortRatings
      )
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    priceRange,
    category,
    ratingsRange,
    sortPrice,
    sortRatings,
    alert,
    error,
  ]);

  return (
    <>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="products_container">
        <div className="pc_left">
          <div className="categories">
            <h4>Categories</h4>
            <ul>
              <li className="single_category" onClick={() => setCategory("")}>
                <span
                  style={
                    category === ""
                      ? {
                          background: "white",
                          color: "lightcoral",
                          borderRadius: "5px",
                          padding: "3%",
                        }
                      : {}
                  }
                >
                  All
                </span>
              </li>
              {categories.map((curr) => (
                <li
                  className="single_category"
                  onClick={() => setCategory(curr)}
                >
                  <span
                    style={
                      category === curr
                        ? {
                            background: "white",
                            color: "lightcoral",
                            borderRadius: "5px",
                            padding: "2%",
                          }
                        : {}
                    }
                  >
                    {curr}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="price_range">
            <h4>Price</h4>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              min={0}
              max={50000}
              valueLabelDisplay="auto"
              step={1000}
              marks={priceRangeMarks}
            />
          </div>

          <div className="ratings_range">
            <h4>Min Ratings</h4>
            <Slider
              value={ratingsRange}
              onChange={(e, newValue) => setRatingsRange(newValue)}
              min={0}
              max={5}
              valueLabelDisplay="auto"
              step={0.5}
              marks={ratingsRangeMarks}
            />
          </div>
        </div>

        <div className="pc_right">
          <div className="sort">
            <h3> Sort By Price </h3>
            <h4
              className="price_sort"
              onClick={() => {
                setSortPrice("incre");
                setCurrentPage(1);
              }}
            >
              <span
                style={
                  sortPrice === "incre"
                    ? {
                        background: "white",
                        color: "lightcoral",
                        borderRadius: "5px",
                        padding: "8%",
                      }
                    : {}
                }
              >
                Increasing
              </span>
            </h4>
            <h4
              className="price_sort"
              onClick={() => {
                setSortPrice("decre");
                setCurrentPage(1);
              }}
            >
              <span
                style={
                  sortPrice === "decre"
                    ? {
                        background: "white",
                        color: "lightcoral",
                        borderRadius: "5px",
                        padding: "8%",
                      }
                    : {}
                }
              >
                Decreasing
              </span>
            </h4>
            {sortPrice !== "" && (
              <h4
                className="price_sort"
                onClick={() => {
                  setSortPrice("");
                  setCurrentPage(1);
                }}
                style={{ borderBottom: "1px solid white" }}
              >
                Clear
              </h4>
            )}
          </div>
          <div className="sort">
            <h3> Sort By Ratings </h3>
            <h4
              className="price_sort"
              onClick={() => {
                setSortRatings("incre");
                setCurrentPage(1);
              }}
            >
              <span
                style={
                  sortRatings === "incre"
                    ? {
                        background: "white",
                        color: "lightcoral",
                        borderRadius: "5px",
                        padding: "8%",
                      }
                    : {}
                }
              >
                Increasing
              </span>
            </h4>
            <h4
              className="price_sort"
              onClick={() => {
                setSortRatings("decre");
                setCurrentPage(1);
              }}
            >
              <span
                style={
                  sortRatings === "decre"
                    ? {
                        background: "white",
                        color: "lightcoral",
                        borderRadius: "5px",
                        padding: "8%",
                      }
                    : {}
                }
              >
                Decreasing
              </span>
            </h4>
            {sortRatings !== "" && (
              <h4
                className="price_sort"
                onClick={() => {
                  setSortRatings("");
                  setCurrentPage(1);
                }}
                style={{ borderBottom: "1px solid white" }}
              >
                Clear
              </h4>
            )}
          </div>

          {loading ? (
            <div className="skeleton_products">
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
              <SkeletonProducts />
            </div>
          ) : (
            <>
              {filteredProductsCount === 0 || productsCount === 0 ? (
                <h4 className="notfound">No Products Found!</h4>
              ) : (
                <div className="display_products">
                  {products.map((curr) => (
                       <ProductCardProducts product={curr} />
                    ))}
                </div>
              )}
            </>
          )}

          {!loading && filteredProductsCount > resultPerPage && (
            <Stack spacing={1} className="pagination_container">
              <Pagination
                count={paginationCount}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                className="pagination"
                color="error"
              />
            </Stack>
          )}
        </div>
      </div>

      <div className="btntotop">
        <Tooltip title="Back To Top" placement="right-start">
          <Button
            title="Back To Top"
            className="topbtn"
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <ArrowUpwardIcon />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default AllProducts;
