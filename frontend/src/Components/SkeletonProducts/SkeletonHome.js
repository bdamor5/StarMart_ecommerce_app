import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import './SkeletonProducts.css'

const SkeletonProducts = () => {
    return (
        <div className='skeleton_container'>
            <Skeleton variant="rectangular" className='skeleton_card'/>
            <Skeleton className='skeleton_1'/>
            <Skeleton className='skeleton_2' />
        </div>
    )
}

export default SkeletonProducts
