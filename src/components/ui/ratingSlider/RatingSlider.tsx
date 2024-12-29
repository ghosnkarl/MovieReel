import React, { useState } from 'react';
import styles from './RatingSlider.module.css';

const RatingSlider: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  return (
    <div className={styles.sliderContainer}>
      <label htmlFor='rating' className={styles.label}>
        Rating:
      </label>
      <input
        type='range'
        id='rating'
        min='0'
        max='10'
        step='1'
        value={rating}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.valueLabels}>
        {[...Array(11)].map((_, i) => (
          <span key={i} className={styles.valueLabel}>
            {i}
          </span>
        ))}
      </div>
      <span className={styles.value}>{rating}</span>
    </div>
  );
};

export default RatingSlider;
