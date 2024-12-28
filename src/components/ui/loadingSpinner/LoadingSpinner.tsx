import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  variant?: 'default' | 'progress';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'default',
}) => {
  const spinnerClass = `${styles.spinner} ${
    variant === 'progress' ? styles.progress : ''
  }`;

  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
