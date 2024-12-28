import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'light' | 'dark';
  variant?: 'default' | 'progress';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'light',
  variant = 'default',
}) => {
  const spinnerClass = `${styles.spinner} ${styles[size]} ${styles[color]} ${
    variant === 'progress' ? styles.progress : ''
  }`;

  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
