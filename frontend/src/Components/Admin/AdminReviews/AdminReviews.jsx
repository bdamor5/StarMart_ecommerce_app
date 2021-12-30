import React, { useState, useEffect } from "react";
import "./AdminReviews.css";
import Sidebar from "../Sidebar/Sidebar";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../../redux/actions/reviewActions";
import { DELETE_REVIEW_RESET } from "../../../redux/constants/reviewConstants";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [productId, setProductId] = useState("");

  const [load, setLoad] = useState(false);

  const { reviews, loading, error } = useSelector((state) => state.allReviews);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                dispatch(
                  deleteReviews(params.getValue(params.id, "id"), productId)
                );
                setLoad(true);
              }}
            >
              <DeleteIcon style={{ color: "tomato" }} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const { isDeleted, error: errorDelete } = useSelector(
    (state) => state.deleteReview
  );

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (isDeleted) {
      alert.success("Review Deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
      setLoad(false);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (errorDelete) {
      alert.error(errorDelete);
    }
  }, [dispatch, productId, isDeleted, error, errorDelete]);

  return (
    <>
      <Helmet>
        <title>All Reviews</title>
      </Helmet>
      <div className="admin_container">
        <div className="sidebar">
          <Sidebar active="Reviews" />
        </div>
        <div className="dashboard">
          <div className="review_box" style={{ marginTop: "-1px" }}>
            <div
              className="registerPassword"
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                paddingBottom: "1%",
              }}
            >
              Enter Product Id : &nbsp;
              <input
                type="text"
                placeholder="Product Id"
                required
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="review_input"
              />
            </div>
          </div>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="datagrid"
              autoHeight
              loading={load || loading ? true : false}
            />
          ) : (
            <span
              style={{ textAlign: "center", color: "grey", fontWeight: "700" }}
            >
              No Reviews Present
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReviews;
