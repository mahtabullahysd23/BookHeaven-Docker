import React from 'react';
import './DisplayRating.style.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const DisplayRating = ({ rating }) => {
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars;

  // Create an array of star components
  const starsArray = [...Array(fullStars)].map((_, index) => (
    <BsStarFill key={`full-${index}`} />
  ));

  if (hasHalfStar) {
    starsArray.push(<BsStarHalf key="half" />);
  }

  starsArray.push(
    ...[...Array(emptyStars)].map((_, index) => (
      <BsStar key={`empty-${index}`} />
    ))
  );

  return <div className='star-group'>{starsArray}</div>;
};

export default DisplayRating;
