import React from 'react'
import './RatingStars.css'
import Row from './Row.jsx'

const emptyStarPath = '../../public/empty_star.png' ;
const fullStarPath = '../../public/full_star.png' ;

const RatingStars = ({value}) => {
    const stars = [1,2,3,4,5] ;
    const nrReviews = Math.floor(Math.random() * 100) ;
  return (
    <Row className='rating_stars_row'>
        {stars.map((nr) => (
            <img src={(value >= nr) ? fullStarPath : emptyStarPath} className='rating_star' key={nr}/>
        ))}
        <Row className='align_on_baseline'>
            <p className='rating_stars_number'>{value}</p>
            <p className='rating_stars_nr_reviews'>{'(' + nrReviews + ')'}</p>
        </Row>
    </Row>
  )
}

export default RatingStars