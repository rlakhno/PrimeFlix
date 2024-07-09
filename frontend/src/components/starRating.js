import React from 'react';
import '../App.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(fullStars).fill(<i className="fa fa-star"></i>)}
      {halfStar && <i className="fa fa-star-half-alt"></i>}
      {Array(emptyStars).fill(<i className="fa fa-star-o"></i>)}
    </div>
  );
};

export default StarRating;