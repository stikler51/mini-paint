import React from 'react';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import styles from './loader.module.scss';

const LoadingIndicator = () => {
  const isLoading = useSelector((state) => state.loading.value);
  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  }
  return '';
};

export default LoadingIndicator;
