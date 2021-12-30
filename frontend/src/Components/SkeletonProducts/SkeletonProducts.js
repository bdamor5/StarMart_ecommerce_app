import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import './SkeletonProducts.css'

const SkeletonProducts = () => {
    return (
        <div className='SP_container'>
            <Skeleton variant="rectangular" className='SP_card'/>
            <Skeleton className='SP_1'/>
            <Skeleton className='SP_2' />
        </div>
    )
}

export default SkeletonProducts
