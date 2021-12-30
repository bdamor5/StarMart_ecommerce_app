import React,{useEffect} from 'react'
import './ReviewCard.css'
import { Rating } from "@mui/lab";

const ReviewCard = ({review}) => {
    return (
        <div className="reviewCard">
        <img src={review.user_url} alt="user" />
        <p>{review.name}</p>
        <Rating size='medium' value={review.rating} readOnly='true' precision={0.5} />
        <span className="reviewCardComment">{review.comment}</span>
    </div>
    )
}

export default ReviewCard
